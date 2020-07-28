import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/ActionCreators';
import { connect } from 'react-redux';
import {GearFill} from 'react-bootstrap-icons'
import Axios from 'axios';

import {logout_url} from './constants'

interface IProps {
    isLoggedIn?: boolean;
    logout?: any;
    jwt_token?: string;
}

const mapStateToProps = (state: any) => ({
    jwt_token: state.user.jwt_token,
})

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(logoutAction())
})

const NavComponentBasic = (props: IProps) =>{
    console.log('login:', props.isLoggedIn );
    
    const handleClick = () =>{
        console.log("toke: ", props.jwt_token);
        
        Axios.get(logout_url, {
            headers:{
                'Authorization': `bearer ${props.jwt_token}`
            }
        }).then(res => {
            console.log("response: ", res.data);
            
            if(res.data.logout){
                props.logout();
            }
        });
    }
    const buttons_loggedIn = (
        <div className="justify-content-end" style={{display: "flex", flexDirection: "row"}}>
            <Nav.Link onClick={handleClick} ><Link to='/login'> Sign Out </Link></Nav.Link>
            <Nav.Link><Link to='/admin'> Create Post </Link></Nav.Link>
        </div>
    );

    const buttons_notloggedIn = (
        <Nav.Link className="justify-content-end"><Link to='/login'> Login </Link></Nav.Link>
    )

    const desktopNavbar = (
        <React.Fragment>
            {props.isLoggedIn ? buttons_loggedIn : buttons_notloggedIn}
        </React.Fragment>
    );

    const mobileNavbar = (
        <React.Fragment>
            <div>
                <Dropdown drop="left">
                    <Dropdown.Toggle size="sm" variant="primary"> <GearFill/> </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to='/'>Home</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='/admin'>Create Post</Link> </Dropdown.Item>
                        <Dropdown.Item onClick={handleClick}><Link to='/login'>Sign Out</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </React.Fragment>
    )
    return(
        
        <Navbar variant="dark" bg="dark" sticky="top" style={{height:"40px", marginBottom:"10px"}}>
            <Navbar.Brand><Link to="/" style={{color: "#ffff"}}>Internships</Link></Navbar.Brand>
            {window.innerWidth > 800 ?  <Nav.Link ><Link to="/">Home</Link></Nav.Link> : null}
            <Navbar.Collapse className="justify-content-end">
                {window.innerWidth > 800 ?  desktopNavbar : mobileNavbar}
            </Navbar.Collapse>
            
        </Navbar>
    );
}

export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(NavComponentBasic);