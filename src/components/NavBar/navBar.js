import './navBar.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { Search } from "../searchBar/search";

import { clearChain, selectChain } from '../../pages/chain/chainSlide';
import { clearVal, selectVal } from '../../pages/validator/validatorSlide';
import { objSearch } from '../../functions/helperFunctions';
import { selectcoingeckoData } from '../../data/dataSlice';


export function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chain = useSelector(selectChain);
    const val = useSelector(selectVal);
    const cVal = val.replaceAll(" ", "%20").replaceAll("|", "%7C");
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
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <Navbar.Collapse className="justify-content-end" />
                    <Search />
                </Container>
            </Navbar>
        )
    } else if (location.pathname === `/${chain}/${cVal}`) { //bug with special signs in location.pathname
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <Nav.Link onClick={navHome}>Home</Nav.Link>
                    <Nav.Link onClick={navChain}><img src={cgData.image.thumb} alt="Pic" />{objSearch('name',chain)}</Nav.Link>
                    <Navbar.Collapse className="justify-content-end" />
                    <Search />
                </Container>
            </Navbar>
        )
    } else {
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <Nav.Link onClick={navHome}>Home</Nav.Link>
                    <Navbar.Collapse className="justify-content-end" />
                    <Search />
                </Container>
            </Navbar>
        )
    }
}
