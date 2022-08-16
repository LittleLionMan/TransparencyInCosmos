import './header.css';
import { useSelector } from 'react-redux';

import { Search } from '../../features/searchBar/search';
import { selectChain } from '../chain/chainSlide';
import { selectVal } from '../validator/validatorSlide';
import { NavBar } from '../../features/NavBar/navBar';

export function Header() {
    const chain = useSelector(selectChain);
    const val = useSelector(selectVal);
    let side = ''
   
    if ( chain === "" && val === "" ) {
        side = 'home';
        return (
            <div>
                <NavBar props={side}/>
                <div className="header" id='start'>
                    <h1>ProjektBanner</h1>
                    <Search />
                </div>
            </div>
        )
    } else if ( chain !== "" && val === "" ) {
        side = 'chain';
        return (
            <div>
                <NavBar props={side}/>
                <div className="header" id='start'>
                        <h1>{chain}</h1>
                        <Search />
                </div>
            </div>
        )
    } else {
        side = 'val';
        return (
            <div>
                <NavBar props={side}/>
                <div className="header" id='start'>
                    <h1>{val} on {chain}</h1>
                    <Search />
                </div>
            </div>
        )
    }

}