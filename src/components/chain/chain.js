import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import './chain.css';

import { setChain } from './chainSlide';
import { data } from '../../data/data';

export function Chain() {
    const dispatch = useDispatch();
    const { chain } = useParams();
    const navigate = useNavigate();
    dispatch(setChain(chain));

    const objSearch = (arg) => {
        for (let name in data) {
            if (name === chain) {
                return data[name][arg];
            }
        }
    }

    const valHandler = (e) => {
        const val = e.target.innerHTML;
        navigate(`/${chain}/${val}`);
    }
    
    return(
        <div className='chain'>
            <div className='generalInfo' id='gi'>
                <p>{objSearch("general")} about {chain}</p>
            </div>
            <div className='specificInfo' id='si'>
                <p>{objSearch("specific")} about {chain}</p>
            </div>
            <div className='validator' id='val'>
                <table>
                    <tr>
                        <th>Name:</th>
                        <th>Security:</th>
                        <th>Decentralization:</th>
                        <th>Governance:</th>
                        <th>Commitment:</th>
                    </tr>
                    {
                      objSearch("validator").map((val) => {
                        return (
                            <tr>
                                <td 
                                    onClick={valHandler}
                                    className='valName'
                                >{val}</td>
                                <td>some%</td>
                                <td>some%</td>
                                <td>some%</td>
                                <td>Text</td>
                            </tr>
                        )
                      })  
                    }
                </table>
            </div>
        </div>
    )
}

