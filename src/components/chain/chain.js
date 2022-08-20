import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import './chain.css';
import { ChainTable } from "../../features/chainTable/chainTable";

import { setChain } from './chainSlide';
import { setBondedToken, selectBondedToken } from "./bondedTokenSlice";
import { data } from '../../data/data';
import { loadBank, selectBank, selectVals, loadVals /* isLoadingData */} from "../../data/dataSlice";


export function Chain() {
    
    const dispatch = useDispatch();
    const { chain } = useParams();
    const bank = useSelector(selectBank);
    const vals = useSelector(selectVals);
    const bondedToken = useSelector(selectBondedToken);
    //const loading = useSelector(isLoadingData);

    useEffect(() => {
        const findLoadVals = (name) => {
            switch (name) {
                case ('juno'):
                    return (
                        loadVals(objSearch("loadVals"))
                        )
                default:
                    return false;
            }
        }

        const findLoadBank = (name) => {
            switch (name) {
                case ('juno'):
                    return (
                        loadBank(objSearch('loadBank') + objSearch("denom"))
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

        dispatch(findLoadBank(chain));
        dispatch(findLoadVals(chain));
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
                <ul>
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

