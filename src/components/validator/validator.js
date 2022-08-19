import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectVals } from "../../data/dataSlice";

import { setVal } from './validatorSlide';
import { selectBondedToken } from "../chain/bondedTokenSlice";

import './validator.css';

export function Validator() {
    const dispatch = useDispatch();
    const { validator } = useParams();
    const vals = useSelector(selectVals);
    const bondedToken = useSelector(selectBondedToken);
    const val = (vals.find(val => val.description.moniker === validator));
    

    dispatch(setVal(validator));
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
            <h1>Zurück navigieren</h1>
        )
    }
    
    return (
        <div className='val'>
            <div className='generalInfo' id='gi'>
                <ul>
                    {websiteHandler()}
                    <li>Details: {val.description.details}</li>                  
                    <li>Stake: {Math.round(val.tokens/1000000)} Coins</li>
                    <li>Address: {val.operator_address}</li>
                    <li>Commission: {val.commission.commission_rates.rate * 100} %</li>
                </ul>
            </div>
            <div className='container' id="si">
                <div className='info'>
                    <h1>Security</h1>
                </div>
                <div className='info'>
                    <h1>Dezentralization</h1>
                    <p>Stake: {Math.round(val.tokens/100/bondedToken) / 100}%</p>
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