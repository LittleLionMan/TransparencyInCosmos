import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import { selectVals, selectDelegations, loadDelegations, isLoadingData, loadValI, selectSlashes, loadSlashes } from "../../data/dataSlice";
import { selectBondedToken } from "../chain/bondedTokenSlice";
import { objSearch } from "../../functions/helperFunctions";

import './validator.css';
//page loses state after refresh. fix needed!
export function Validator() {
    const dispatch = useDispatch();
    const { chain } = useParams();
    const { validator } = useParams();
    const vals = useSelector(selectVals);
    const bondedToken = useSelector(selectBondedToken);
    const val = (vals.find(val => val.description.moniker === validator));
    const delegations = useSelector(selectDelegations);
    const loading = useSelector(isLoadingData);
    const numberSlashes = useSelector(selectSlashes);

    useEffect(() => {
        dispatch(loadValI(objSearch('loadValI', chain) + val.operator_address))
        dispatch(loadDelegations(objSearch('loadDelegations', chain) + val.operator_address + "/delegations?pagination.limit=100000"));
        dispatch(loadSlashes(objSearch('loadSlashes', chain) + val.operator_address + "/slashes?endingHeight=4716616"));
    }, [chain, dispatch, val.operator_address]);

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

    if (vals[0] === undefined) {
        return (
            <h1>Navigate back</h1>
        )
    }

    const delegatedTokens = countHandler(delegations.delegation_responses);
    const moreThanOne = delegations.delegation_responses.filter(element => element.balance.amount > 1000000);
    
    return (
        <Container style={{ marginTop: 70}}>
            <h1>{val.description.moniker}</h1>
            <Container className="details">
                <ListGroup>
                    {websiteHandler()}
                    <ListGroup.Item><b>Details: </b>{val.description.details}</ListGroup.Item>                  
                    <ListGroup.Item><b>Stake: </b>{loading ? <Spinner animation="border" size="sm"/> : delegatedTokens + " Coins"}</ListGroup.Item>
                    <ListGroup.Item><b>Address: </b>{val.operator_address}</ListGroup.Item>
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
                            <ListGroup.Item><b>Stake: </b>{loading ? <Spinner animation="border" size="sm"/> : (Math.round(delegatedTokens * 10000/bondedToken) / 100)+ " %"} </ListGroup.Item>
                            <ListGroup.Item><b>Delegations: </b>{loading ? <Spinner animation="border" size="sm"/> : delegations.delegation_responses.length + " (>1 Coin: " + Math.round(100 * moreThanOne.length/delegations.delegation_responses.length) + " %)"}</ListGroup.Item>
                            <ListGroup.Item><b>Average Delegation: </b>{loading ? <Spinner animation="border" size="sm"/> : Math.round(delegatedTokens/delegations.delegation_responses.length) + " Coins (>1 Coin: " + Math.round(countHandler(moreThanOne)/moreThanOne.length) + " Coins)"}</ListGroup.Item>
                            <ListGroup.Item><b>Largest Delegation: </b>{loading ? <Spinner animation="border" size="sm"/> : Math.round(Math.max(...arrHandler(delegations.delegation_responses)) / 1000000) + " Coins"}</ListGroup.Item>
                        </ListGroup>
                        
                    </Col>
                </Row>
                <Row>
                    <Col className="info-c">
                        <h2>Governance</h2>
                    </Col>
                    <Col className="info-c">
                        <h2>Commitment</h2>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}