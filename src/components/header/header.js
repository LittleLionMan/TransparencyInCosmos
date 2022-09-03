import './header.css';
import { useSelector } from 'react-redux';

import { selectChain } from '../../pages/chain/chainSlide';
import { selectVal } from '../../pages/validator/validatorSlide';
import { NavBar } from '../NavBar/navBar';
import { objSearch } from '../../functions/helperFunctions';
import { selectcoingeckoData } from '../../data/dataSlice';

export function Header() {
    const chain = useSelector(selectChain);
    const val = useSelector(selectVal);
    const cgData = useSelector(selectcoingeckoData);

    let side = '';
    if ( chain === "" && val === "" ) {
        side = 'home';
        return (
            <div>
                <NavBar props={side}/>
                <div className="header" id='start'>
                    <h1>Transparancy in Cosmos</h1>
                </div>
            </div>
        )
    } else if ( chain !== "" && val === "" ) {
        side = 'chain';
        return (
            <div>
                <NavBar props={side}/>
                <div className="header" id='start'>
                        <img src={cgData.image.small} alt="Pic" />
                        <h1>{objSearch('name', chain)}</h1>
                </div>
            </div>
        )
    } else {
        side = 'val';
        return (
            <div>
                <NavBar 
                    props={side}
                />
                <div className="header" id='start'>
                    <h1>{val} on {chain}</h1>
                </div>
            </div>
        )
    }

}