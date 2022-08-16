import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setVal } from './validatorSlide';

import './validator.css';

export function Validator() {
    const dispatch = useDispatch();
    const { validator } = useParams();
    dispatch(setVal(validator));

    return (
        <div className='val'>
            <div className='generalInfo' id='gi'>
                General Info
            </div>
            <div className='container' id="si">
                <div className='info'>
                    <h1>Security</h1>
                </div>
                <div className='info'>
                    <h1>Dezentralization</h1>
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