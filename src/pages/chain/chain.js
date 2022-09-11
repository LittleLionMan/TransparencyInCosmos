import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import './chain.css';
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
        <div className='chain'>
            <div className="header" id='start'>
                <img src={cgData.image.small} alt="Pic" />
                <h1>{objSearch('name', chain)}</h1>
             </div>
            <div className='generalInfo' id='gi'>
                <h5>{cgData.description.en}</h5>
                <ul>
                    <li><a href={cgData.links.homepage[0]}>Website </a></li>
                    <li>Price: {cgData.market_data.current_price.usd}$</li>
                </ul>
            </div>
            <SpoilerBar 
                name='Detailed Information'
                containerName='si'
            />
            <div className='specificInfo' id='si'>
                <ul>
                    <li>Price-change in 24h: {Math.round(cgData.market_data.price_change_percentage_24h * 100) / 100}%</li>
                    <li>Marketcap: {Math.round(cgData.market_data.current_price.usd * bank.amount.amount / 1000000)}$ (Rank: {cgData.market_data.market_cap_rank})</li>
                    <li>Supply: {Math.round(bank.amount.amount / 1000000)} Coins</li>
                    <li>Staked: {bondedToken} Coins ({Math.round(bondedToken / (bank.amount.amount / 1000000000))/10}%)</li>
                    <li>Community Pool: {Math.round(cp.pool[cp.pool.length - 1].amount / 1000000)} Coins ({Math.round(cp.pool[cp.pool.length - 1].amount / bank.amount.amount * 10000) / 100}%)</li>
                </ul>
            </div>
            <ChainTable />
        </div>
        
    )
}

