import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import './chain.css';
import { ChainTable } from "../../features/chainTable/chainTable";

import { setChain } from './chainSlide';
import { setBondedToken, selectBondedToken } from "./bondedTokenSlice";
import { data } from '../../data/data';
import { loadBank, selectBank, selectVals, loadVals, coingeckoData, selectcoingeckoData} from "../../data/dataSlice";


export function Chain() {
    
    const dispatch = useDispatch();
    const { chain } = useParams();
    const bank = useSelector(selectBank);
    const vals = useSelector(selectVals);
    const cgData = useSelector(selectcoingeckoData);
    const bondedToken = useSelector(selectBondedToken);

    
    useEffect(() => {
        const objSearch = (arg) => {
            for (let name in data) {
                if (name === chain) {
                    return data[name][arg];
                }
            }
        }

        dispatch(loadBank(objSearch('loadBank') + objSearch("denom")));
        dispatch(loadVals(objSearch("loadVals")));
        dispatch(coingeckoData(objSearch("cgId")));
    }, [dispatch, chain]);

    const stakeHandler = (arr) => {
        let sum = 0;
        arr.forEach(element => {
            if (parseInt(element.tokens) !== undefined) {
                sum += parseInt(element.tokens);
            }
        });
        return Math.round(sum/1000000);
    }

    dispatch(setChain(chain));
    dispatch(setBondedToken(stakeHandler(vals)));
    
    return(
        <div className='chain'>
            <div className='generalInfo' id='gi'>
                <h5>{cgData.description.en}</h5>
                <ul>
                    <li><a href={cgData.links.homepage[0]}>Website </a></li>
                    <li>Price: {cgData.market_data.current_price.usd}$</li>
                    <li>Change in 24h: {Math.round(cgData.market_data.price_change_percentage_24h * 100) / 100}%</li>
                    <li>Marketcap: {Math.round(cgData.market_data.current_price.usd * bank.amount.amount / 1000000)}$ (Rank: {cgData.market_data.market_cap_rank})</li>
                    <li>Supply: {Math.round(bank.amount.amount / 1000000)} Coins</li>
                    <li>Staked: {bondedToken} Coins ({Math.round(bondedToken / (bank.amount.amount / 1000000000))/10}%)</li>
                </ul>
            </div>
            <div className='specificInfo' id='si'>
                <p>about {chain}</p>
            </div>
            <ChainTable />
        </div>
    )
}

