import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './chainTable.css';
import { ValChart } from "../valChart/valChart";
import { InfoBar } from "../InfoBar/infoBar";

import { isLoadingData, selectVals /* hasErrorData */ } from "../../data/dataSlice";
import { setVal } from "../../pages/validator/validatorSlide";
import { selectBondedToken } from "../../pages/chain/bondedTokenSlice";
import { selectChain } from "../../pages/chain/chainSlide";


export const ChainTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chain = useSelector(selectChain);
    const bondedToken = useSelector(selectBondedToken);
    let counter = 0;
    
    const vals = useSelector(selectVals);
    const activeVals = vals.filter(value => value.status === "BOND_STATUS_BONDED");
    activeVals.sort(function(a, b){return parseInt(b.tokens) - parseInt(a.tokens)});
    const loading = useSelector(isLoadingData);

    const valHandler = (e) => {
        const val = e.target.innerHTML;
        const cVal = val.replaceAll("%", "&");
        dispatch(setVal(val));
        navigate(`/${chain}/${cVal}`);
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
    activeVals.some(check);

    return {backgroundColor: threshold};
        
    }

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
    }
    const cVals = [...activeVals];
    shuffleArray(cVals);

    return (
        <div className='validator' id='val'>
                <div>
                    <InfoBar props="valChartI"/>
                    <ValChart aVals={activeVals} bToken={bondedToken} loading={loading}/>
                </div>
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
                        
                        cVals.map(val => {
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
                                        >{(Math.round(val.tokens / bondedToken / 100)) / 100}% ({activeVals.indexOf(val) + 1})</td>
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