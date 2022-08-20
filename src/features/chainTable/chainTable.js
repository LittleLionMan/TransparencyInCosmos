import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './chainTable.css';

import { isLoadingData, selectVals /* hasErrorData */ } from "../../data/dataSlice";
import { setVal } from "../../components/validator/validatorSlide";
import { selectBondedToken } from "../../components/chain/bondedTokenSlice";
import { selectChain } from "../../components/chain/chainSlide";


export const ChainTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chain = selectChain;
    const bondedToken = useSelector(selectBondedToken);
    let counter = 0;
    
    const vals = useSelector(selectVals);
    const activeVals = vals.filter(value => value.status === "BOND_STATUS_BONDED");
    const sVals = activeVals.sort(function(a, b){return parseInt(b.tokens) - parseInt(a.tokens)});
    const loading = useSelector(isLoadingData);
    //const error = useSelector(hasErrorData);

    const valHandler = (e) => {
        const val = e.target.innerHTML;
        dispatch(setVal(val));
        navigate(`/${chain}/${val}`);
    }

    const decentralize = (val) => {
        let percent = 0;
        let counter = 'red';
        let threshold = 'red';
        function check (element) {
            if (val === element) {
                percent+=((element.tokens/10000) / bondedToken);
                threshold = counter;
                return threshold;
            } else {
                percent+=((element.tokens/10000) / bondedToken);
                if (percent > 33 && percent < 66) {
                    counter = 'yellow';
                } else if (percent > 66) {
                    counter = 'green';
                }
            }
        }
        
        sVals.some(check);
        return {backgroundColor: threshold};
        
    }
    console.log(decentralize(sVals[8]))
    //console.log(sVals);
    return (
        <div className='validator' id='val'>
                <table>
                    <thead>
                        <tr>
                            <th>Name:</th>
                            <th>Security:</th>
                            <th>Decentralization:</th>
                            <th>Governance:</th>
                            <th>Commitment:</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        loading ? <tr><td>loading</td></tr> :
                        
                        activeVals.map(val => {
                                counter ++;
                                return (
                                    <tr key={counter}>
                                        <td 
                                            onClick={valHandler}
                                            className='valName'
                                        >{val.description.moniker}</td>
                                        <td>some%</td>
                                        <td
                                            style={decentralize(val)}
                                        >{(Math.round(val.tokens / bondedToken / 100)) / 100}% ({sVals.indexOf(val) + 1})</td>
                                        <td>some%</td>
                                        <td>Text</td>
                                    </tr>
                                )
                        })
                        
                    }
                    </tbody>
                </table>
            </div>
    )
}