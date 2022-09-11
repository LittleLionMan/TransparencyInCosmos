import './navBar.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';

import { clearChain, selectChain } from '../../pages/chain/chainSlide';
import { clearVal, selectVal } from '../../pages/validator/validatorSlide';
import { objSearch } from '../../functions/helperFunctions';
import { selectcoingeckoData } from '../../data/dataSlice';



export function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chain = useSelector(selectChain);
    const val = useSelector(selectVal);
    const cgData = useSelector(selectcoingeckoData);

    const location = useLocation();

    const navHome = () => {
        dispatch(clearChain());
        dispatch(clearVal());
        navigate('/');
    }

    const navChain = () => {
        dispatch(clearVal(""));
        navigate(`/${chain}`);
    }

    if (location.pathname === '/') {
        return (
            <div className='navi-container'>
                <div className='onPage'>
                    <nav>
                        <ul>
                            <li><a href='#start'>Start</a></li>
                            <li><a href='#pd'>Info</a></li>
                            <li><a href='#ci'>Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    } else if (location.pathname === `/${chain}`) {
        return (
            <div className='navi-container'>
                <div className='offPage'>
                    <ul>
                        <li onClick={navHome}>Home</li>
                    </ul>
                </div>
                <div className='onPage'>
                    <nav>
                        <ul>
                            <li><a href='#start'>Start</a></li>
                            <li><a href='#gi'>General Info</a></li>
                            <li><a href='#si'>Specific Info</a></li>
                            <li><a href='#val'>Validators</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    } else if (location.pathname === `/${chain}/${val}`) {
        return (
            <div className='navi-container'>
                <div className='offPage'>
                    <ul>
                        <li onClick={navHome}>Home</li>
                        <li onClick={navChain}><img src={cgData.image.thumb} alt="Pic" />{objSearch('name',chain)}</li>
                    </ul>
                </div>
                <div className='onPage'>
                    <nav>
                        <ul>
                            <li><a href='#start'>Start</a></li>
                            <li><a href='#gi'>General Info</a></li>
                            <li><a href='#si'>Specific Info</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    } else {
        return (
            <div className='navi-container'>
                <div className='offPage'>
                    <ul>
                        <li onClick={navHome}>Home</li>
                    </ul>
                </div>
                <div className='onPage'>
                </div>
            </div>
        )
    }
}