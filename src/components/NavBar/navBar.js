import './navBar.css';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Search } from "../searchBar/search";
import { GrazProvider, mainnetChains } from "graz";
import { Wallet } from '../wallet/wallet';

import { clearChain } from '../../pages/chain/chainSlide';
import { clearVal } from '../../pages/validator/validatorSlide';


export function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const navHome = () => {
        dispatch(clearChain());
        dispatch(clearVal());
        navigate('/');
    }

    if (location.pathname === '/') {
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <GrazProvider
                        // optional
                        grazOptions={{
                        defaultChain: mainnetChains.cosmoshub,
                        }}
                        >
                        <Wallet />
                    </GrazProvider>
                    <Navbar.Collapse className="justify-content-end" />
                    <Search />
                </Container>
            </Navbar>
        )
    } else {
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <GrazProvider
                        // optional
                        grazOptions={{
                        defaultChain: mainnetChains.cosmoshub,
                        }}
                        >
                        <Wallet />
                    </GrazProvider>
                    <Nav.Link onClick={navHome}>Home</Nav.Link>
                    <Navbar.Collapse className="justify-content-end" />
                    <Search />
                </Container>
            </Navbar>
        )
    }
}
