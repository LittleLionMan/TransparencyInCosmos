import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './chainTable.css';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { ValChart } from "../valChart/valChart";
import { InfoBar } from "../InfoBar/infoBar";
import { SpoilerBar } from "../spoilerBar/spoilerBar";

import { isLoadingData, selectVals, selectProposals /* hasErrorData */ } from "../../data/dataSlice";
import { setVal } from "../../pages/validator/validatorSlide";
import { selectBondedToken } from "../../pages/chain/bondedTokenSlice";
import { selectChain } from "../../pages/chain/chainSlide";

export const ChainTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chain = useSelector(selectChain);
    const bondedToken = useSelector(selectBondedToken);
    const proposals = useSelector(selectProposals);
    let counter = 0;
    
    const vals = useSelector(selectVals);
    const activeVals = vals.filter(value => value.status === "BOND_STATUS_BONDED");
    activeVals.sort(function(a, b){return parseInt(b.tokens) - parseInt(a.tokens)});
    const loading = useSelector(isLoadingData);

    const valHandler = (e) => {
        const val = e.target.innerHTML;
        const cVal = val.replaceAll("/", "|");
        dispatch(setVal(val));
        navigate(`/${chain}/${cVal}`);
    }

    const changeHandler = (e) => {

        let input, filter, table, tr, td, i, txtValue;
        input = e.target.value;
        filter = input.toUpperCase();
        table = document.getElementById("valTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
            }
        }
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

    return {color: threshold};
        
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
    let filter = cVals;

    return (
        <div className='validator' id='val' >
                <SpoilerBar 
                    name='Distribution Graph'
                    containerName='valGraph'
                    barName='dist-graph'
                />
                <div id='valGraph' style={{display: 'none'}}>
                    <InfoBar props="valChartI"/>
                    <ValChart aVals={activeVals} bToken={bondedToken} loading={loading}/>
                </div>
                <SpoilerBar 
                    name='Validators'
                    containerName='valTable'
                />
                <Table 
                    striped 
                    bordered 
                    hover
                    responsive
                    id='valTable' 
                    style={{display: 'none'}} 
                    variant="dark"
                >
                    <thead>
                        <tr>
                            <th>
                                Name: 
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Filter"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={changeHandler}
                                    />
                                </Form>
                            </th>
                            <th>Security:</th>
                            <th>Decentralization:</th>
                            <th>Governance:</th>
                            <th>Commitment:</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        loading ? <tr><td><Spinner animation="border" /></td></tr> :
                        
                        filter.map(val => {
                                counter ++;
                                return (
                                    <tr key={counter} onClick={valHandler}>
                                        <td 
                                            className='valName'
                                        >{val.description.moniker}</td>
                                        <td></td>
                                        <td
                                            style={decentralize(val)}
                                        >{(Math.round(val.tokens / bondedToken / 100)) / 100}% ({activeVals.indexOf(val) + 1})</td>
                                        <td>?/{proposals.proposals.length}</td>
                                        <td>?</td>
                                    </tr>
                                )
                        })
                        
                    }
                    </tbody>
                </Table>
            </div>
    )
}