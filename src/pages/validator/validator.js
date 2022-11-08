import { useParams } from "react-router-dom";
import { toBech32, fromBech32 } from '@cosmjs/encoding';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import { ValVoteChart } from "../../components/valVoteChart/valVoteChart";
import { VotingChart } from "../../components/votingChart/votingChart";
import { selectVals, selectDelegations, loadDelegations, isLoadingData, isLoadingDelegations, selectSlashes, loadSlashes, selectHeight, loadSelfStake, selectSelfStake, selectProposals, loadAuthz, selectAuthz, loadVotes, selectVotes } from "../../data/dataSlice";
import { selectBondedToken } from "../chain/bondedTokenSlice";
import { objSearch } from "../../functions/helperFunctions";
import { selectVal } from "./validatorSlide";

import './validator.css';

export function Validator() {
    const dispatch = useDispatch();
    const { chain } = useParams();
    const unstoredValidator = useSelector(selectVal);
    const unstoredVals = useSelector(selectVals);
    const unstoredProposals = useSelector(selectProposals);
    const unstoredBondedToken = useSelector(selectBondedToken);
    const selfStake = useSelector(selectSelfStake);
    const delegations = useSelector(selectDelegations);
    const loading = useSelector(isLoadingData);
    const loadingDelegations = useSelector(isLoadingDelegations);
    const numberSlashes = useSelector(selectSlashes);
    const height = useSelector(selectHeight);
    const votes = useSelector(selectVotes);
    const authz = useSelector(selectAuthz);
    let countedVotes = [
        {
            subject: "Yes",
            votes: 0
        },
        {
            subject: "No",
            votes: 0
        },
        {
            subject: "No with veto",
            votes: 0
        },
        {
            subject: "Abstain",
            votes: 0
        },
        {
            subject: "Not V.",
            votes: 0
        },
    ]
    let counter = 0;

    if (unstoredVals[1] !== undefined) {
        localStorage.setItem('vals', JSON.stringify(unstoredVals));
    }

    if (unstoredProposals.proposals[1] !== undefined) {
        localStorage.setItem('proposals', JSON.stringify(unstoredProposals));
    }

    if (unstoredValidator !== "") {
        localStorage.setItem('validator', unstoredValidator);
    }

    if (height.result.response.last_block_height !== 0) {
        localStorage.setItem('height', height.result.response.last_block_height)
    }

    if (unstoredBondedToken !== "") {
        localStorage.setItem('bondedToken', unstoredBondedToken);
    }

    const vals = JSON.parse(localStorage.getItem('vals'));
    const proposals = JSON.parse(localStorage.getItem('proposals'));
    const validator = localStorage.getItem('validator');
    const bondedToken = localStorage.getItem('bondedToken');
    const blockHeight = localStorage.getItem('height');
    
    const val = (vals.find(val => val.description.moniker === validator));
    const { prefix, data } = fromBech32(val.operator_address);
    const address = toBech32(prefix.split('valoper')[0], data);

    useEffect(() => {
        dispatch(loadSlashes(objSearch('loadSlashes', chain) + val.operator_address + `/slashes?endingHeight=${blockHeight}`));
        dispatch(loadSelfStake(objSearch('loadSelfStake', chain) + address + '/delegations'))
        dispatch(loadVotes(objSearch('loadVotes', chain) + address + '%27'));
        dispatch(loadAuthz(objSearch('loadAuthz', chain) + address + '%27'));
    }, [chain, dispatch, blockHeight, val.operator_address, address]);

    useEffect(() => {
        dispatch(loadDelegations(objSearch('loadDelegations', chain) + val.operator_address + "/delegations?pagination.limit=100000"));
    }, [chain, dispatch, val.operator_address])

    const countHandler = (arr) => {
        let sum = 0;
        arr.forEach(element => {
             sum += parseInt(element.balance.amount);
        });
        return Math.round(sum/1000000);
    }

    const arrHandler = (arr) => {
        let array = [];
        arr.forEach(element => {
             array.push(element.balance.amount);
        });
        return array;
    }
    
    const websiteHandler = () => {
        if (val.description.website !== "") {
            return (
                <ListGroup.Item variant='primary'><b>Moniker:</b> <a href={val.description.website}>{val.description.moniker}</a></ListGroup.Item>
            )
        } else {
            return (
                <ListGroup.Item variant='primary'><b>Moniker:</b> {val.description.moniker}</ListGroup.Item>
            )
        }
    }

    const votingInfo = (propId) => {
        let vote = ''
        authz.txs.some(element => {
            const array = element.body.messages[0].msgs[0];
            if (array.proposal_id === propId) {
                vote = array.option;
            }
            return vote
        })
        if (votes.txs) {
            votes.txs.some(element => {
                const array = element.body.messages[0];
                if (array.proposal_id === propId) {
                    vote = array.option;
                }
                return vote
            })
            if (vote === "") {
                vote = "NO VOTE";
            } else {
                vote = vote.slice(12);
            }
            return vote;
        }
        return vote;
    }

    const bcHandler = (vI) => {
        switch(vI) {
            case "YES":
                countedVotes[0].votes++
                return "success";
            case  "NO":
                countedVotes[1].votes++
                return "danger";
            case "NO_WITH_VETO":
                countedVotes[2].votes++
                return "info";
            case "ABSTAIN":
                countedVotes[3].votes++
                return "dark";
            default: 
            countedVotes[4].votes++
                return "light"
        }
        
    }

    if (vals[0] === undefined) {
        return (
            <h1>Navigate back</h1>
        )
    }

    const delegatedTokens = countHandler(delegations.delegation_responses);
    const moreThanOne = delegations.delegation_responses.filter(element => element.balance.amount > 1000000);
    
    return (
        <Container style={{ marginTop: 70, marginBottom: 20}}>
            <h1>{val.description.moniker}</h1>
            <Container className="details">
                <ListGroup>
                    {websiteHandler()}
                    <ListGroup.Item><b>Details: </b>{val.description.details}</ListGroup.Item>                  
                    <ListGroup.Item><b>Stake: </b>{loadingDelegations ? <Spinner animation="border" size="sm"/> : Intl.NumberFormat().format(delegatedTokens) + " " + objSearch("coin", chain)}</ListGroup.Item>
                    <ListGroup.Item><b>Address: </b>{val.operator_address}</ListGroup.Item>
                    <ListGroup.Item><b>Selfstaked: </b>{loadingDelegations ? <Spinner animation="border" size="sm"/> : Intl.NumberFormat().format(Math.round(selfStake.result[0].delegation.shares/1000000)) + ` ${objSearch("coin", chain)} (` + Math.round(Math.round(selfStake.result[0].delegation.shares/1000000)/delegatedTokens * 100000)/1000 + "%)"}</ListGroup.Item>
                    <ListGroup.Item><b>Commission: </b>{Math.round(val.commission.commission_rates.rate * 100) + " %"}</ListGroup.Item>
                </ListGroup>
            </Container>
            <Container className="info">
                <Row>
                    <Col className="info-c">
                        <h2>Security</h2>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><b>Slashes: </b>{loading ? <Spinner animation="border" size="sm"/> : numberSlashes.slashes.length}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col className="info-c">
                        <h2>Decentralization</h2>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><b>Stake: </b>{loadingDelegations ? <Spinner animation="border" size="sm"/> : (Math.round(delegatedTokens * 10000/bondedToken) / 100)+ "%"} </ListGroup.Item>
                            <ListGroup.Item><b>Delegations: </b>{loadingDelegations ? <Spinner animation="border" size="sm"/> : Intl.NumberFormat().format(delegations.delegation_responses.length) + ` (>1 ${objSearch("coin", chain)}: ` + Math.round(100 * moreThanOne.length/delegations.delegation_responses.length) + "%)"}</ListGroup.Item>
                            <ListGroup.Item><b>Average Delegation: </b>{loadingDelegations ? <Spinner animation="border" size="sm"/> : Math.round(delegatedTokens/delegations.delegation_responses.length) + ` ${objSearch("coin", chain)} (>1 ${objSearch("coin", chain)}: ` + Math.round(countHandler(moreThanOne)/moreThanOne.length) + ` ${objSearch("coin", chain)})`}</ListGroup.Item>
                            <ListGroup.Item><b>Largest Delegation: </b>{loadingDelegations ? <Spinner animation="border" size="sm"/> : Intl.NumberFormat().format(Math.round(Math.max(...arrHandler(delegations.delegation_responses)) / 1000000)) + ` ${objSearch("coin", chain)}`}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="info-c">
                        <h2>Governance</h2>
                        <ValVoteChart data={countedVotes}/>
                        {
                        loading ? <Spinner animation="border" /> :
                        proposals.proposals.map(element => {
                            counter++;
                            let vI = votingInfo(element.proposal_id);
                            
                            const data = [
                                { name: 'Yes', value: Number(element.final_tally_result.yes), fill: '#00ff00' },
                                { name: 'No', value: Number(element.final_tally_result.no), fill: '#ff0000' },
                                { name: 'No With Veto', value: Number(element.final_tally_result.no_with_veto), fill: '#800080' },
                                { name: 'Abstain', value: Number(element.final_tally_result.abstain), fill: '#000000' },
                              ];
                            return (
                                <OverlayTrigger key={counter}
                                    trigger="click"
                                    rootClose={true}
                                    placement='top'
                                    overlay={
                                        <Popover className="popover">
                                            <Popover.Header as="h3"><b>{element.proposal_id}.</b> {element.content.title}</Popover.Header>
                                            <Popover.Body>
                                                <div className="voteChartContainer">
                                                    <VotingChart data={data} />
                                                </div>
                                                <b>Vote:</b> {vI}
                                                <br />
                                                <b>Status:</b> {element.status.slice(16)}
                                                <br />
                                                <br />
                                                {element.content.description}
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <Button variant={bcHandler(vI)} className="buttons">{element.proposal_id}</Button>
                                </OverlayTrigger>
                            )
                        })
                    }
                    </Col>
                    <Col className="info-c">
                        <h2>Commitment</h2>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}