import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

//import './chain.css';
import { ChainTable } from "../../components/chainTable/chainTable";
import { SpoilerBar } from "../../components/spoilerBar/spoilerBar";
import { setChain } from './chainSlide';
import { setBondedToken, selectBondedToken } from "./bondedTokenSlice";
import { loadBank, selectBank, selectVals, loadVals, coingeckoData, selectcoingeckoData, selectCommunityPool, loadCommunityPool, loadProposals} from "../../data/dataSlice";

import { objSearch } from "../../functions/helperFunctions";


export function Chain() {
    
    const dispatch = useDispatch();
    const { chain } = useParams();
    const bank = useSelector(selectBank);
    const vals = useSelector(selectVals);
    const cp = useSelector(selectCommunityPool);
    const cgData = useSelector(selectcoingeckoData);
    const bondedToken = useSelector(selectBondedToken);
    
    useEffect(() => {
        dispatch(loadBank(objSearch('loadBank', chain) + objSearch("denom", chain)));
        dispatch(loadVals(objSearch("loadVals", chain)));
        dispatch(loadCommunityPool(objSearch("loadCommunityPool", chain)));
        dispatch(coingeckoData(objSearch("cgId", chain)));
        dispatch(loadProposals(objSearch('loadProposals', chain))); 

        dispatch(setChain(chain));
        
    }, [dispatch, chain]);

    useEffect(() => {
        const stakeHandler = (arr) => {
            let sum = 0;
            arr.forEach(element => {
                if (parseInt(element.tokens) !== undefined) {
                    sum += parseInt(element.tokens);
                }
            });
            return Math.round(sum/1000000);
        }

        dispatch(setBondedToken(stakeHandler(vals)));

    }, [dispatch, vals]);

    return(
        <Container style={{ marginTop: 70}}>
            <Container>
                <Row xs='auto'>
                    <Col><img src={cgData.image.small} alt="Pic" /></Col>
                    <Col><h1>{objSearch('name', chain)}</h1></Col>
                </Row>
            </Container>
            <Container>
                <p>{cgData.description.en}</p>
                <ListGroup horizontal>
                    <ListGroup.Item><a href={cgData.links.homepage[0]}>Website </a></ListGroup.Item>
                    <ListGroup.Item>Price: {cgData.market_data.current_price.usd}$</ListGroup.Item>
                </ListGroup>
            </Container>
            <SpoilerBar 
                name='Detailed Information'
                containerName='si'
            />
            <ListGroup id='si' style={{display: 'none'}}>
                <ListGroup.Item><b>Price-change in 24h: </b>{Math.round(cgData.market_data.price_change_percentage_24h * 100) / 100}%</ListGroup.Item>
                <ListGroup.Item><b>Marketcap: </b>{Math.round(cgData.market_data.current_price.usd * bank.amount.amount / 1000000)}$ (Rank: {cgData.market_data.market_cap_rank})</ListGroup.Item>
                <ListGroup.Item><b>Supply: </b>{Math.round(bank.amount.amount / 1000000)} Coins</ListGroup.Item>
                <ListGroup.Item><b>Staked: </b>{bondedToken} Coins ({Math.round(bondedToken / (bank.amount.amount / 1000000000))/10}%)</ListGroup.Item>
                <ListGroup.Item><b>Community Pool: </b>{Math.round(cp.pool[cp.pool.length - 1].amount / 1000000)} Coins ({Math.round(cp.pool[cp.pool.length - 1].amount / bank.amount.amount * 10000) / 100}%)</ListGroup.Item>  
            </ListGroup>
            <ChainTable />
        </Container>
        
    )
}

