import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import './chain.css';
import { ChainTable } from "../../features/chainTable/chainTable";

import { setChain } from './chainSlide';
import { data } from '../../data/data';


export function Chain() {
    
    const dispatch = useDispatch();
    const { chain } = useParams();
    dispatch(setChain(chain));

    const objSearch = (arg) => {
        for (let name in data) {
            if (name === chain) {
                return data[name][arg];
            }
        }
    }
    
    return(
        <div className='chain'>
            <div className='generalInfo' id='gi'>
                <p>{objSearch("general")} about {chain}</p>
            </div>
            <div className='specificInfo' id='si'>
                <p>{objSearch("specific")} about {chain}</p>
            </div>
            <ChainTable props={chain}/>
        </div>
    )
}

