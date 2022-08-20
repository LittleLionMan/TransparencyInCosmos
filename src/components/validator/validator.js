import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { selectVals, selectDelegations, loadDelegations, isLoadingData } from "../../data/dataSlice";

//import { setVal } from './validatorSlide';
import { selectBondedToken } from "../chain/bondedTokenSlice";
import { selectChain } from "../chain/chainSlide";
import { data } from "../../data/data";

import './validator.css';

export function Validator() {
    const dispatch = useDispatch();
    const { validator } = useParams();
    const vals = useSelector(selectVals);
    const chain = useSelector(selectChain)
    const bondedToken = useSelector(selectBondedToken);
    const val = (vals.find(val => val.description.moniker === validator));
    const delegations = useSelector(selectDelegations);
    const loading = useSelector(isLoadingData);

    useEffect(() => {
        const findDelegations = (name, valAdd) => {
            switch (name) {
                case ('juno'):
                    return (
                        loadDelegations(objSearch('loadDelegations') + valAdd + "/delegations?pagination.limit=100000")
                        )
                default:
                    return false;
            }
        }

        const objSearch = (arg) => {
            for (let name in data) {
                if (name === chain) {
                    return data[name][arg];
                }
            }
        }

        dispatch(findDelegations(chain, val.operator_address));
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
                <li>Moniker: <a href={val.description.website}>{val.description.moniker}</a></li>
            )
        } else {
            return (
                <li>Moniker: {val.description.moniker}</li>
            )
        }
    }

    if (val === undefined) {
        return (
            <h1>Navigate back</h1>
        )
    }

    const delegatedTokens = countHandler(delegations.delegation_responses);
    const moreThanOne = delegations.delegation_responses.filter(element => element.balance.amount > 1000000);
    
    
    return (
        <div className='val'>
            <div className='generalInfo' id='gi'>
                <ul>
                    {websiteHandler()}
                    <li>Details: {val.description.details}</li>                  
                    <li>Stake: {loading ? "loading " : delegatedTokens + " Coins"}</li>
                    <li>Address: {val.operator_address}</li>
                    <li>Commission: {val.commission.commission_rates.rate * 100 + " %"}</li>
                </ul>
            </div>
            <div className='container' id="si">
                <div className='info'>
                    <h1>Security</h1>
                </div>
                <div className='info'>
                    <h1>Dezentralization</h1>
                    <ul>
                        <li>Stake: {loading ? "loading " : (Math.round(delegatedTokens * 10000/bondedToken) / 100)+ " %"} </li>
                        <li>Individual Delegations: {loading ? "loading" : delegations.delegation_responses.length + " (>1 Coin: " + moreThanOne.length + ")"}</li>
                        <li>Average Delegation: {loading ? "loading" : Math.round(delegatedTokens/delegations.delegation_responses.length) + " Coins (>1 Coin: " + Math.round(countHandler(moreThanOne)/moreThanOne.length) + " Coins)"}</li>
                        <li>Largest Delegation: {loading ? "loading " : Math.round(Math.max(...arrHandler(delegations.delegation_responses)) / 1000000) + " Coins"}</li>
                    </ul>
                    
                </div>
                <div className='info'>
                    <h1>Governance</h1>
                </div>
                <div className='info'>
                    <h1>Commitment</h1>
                </div>
            </div>
        </div>
    )
}