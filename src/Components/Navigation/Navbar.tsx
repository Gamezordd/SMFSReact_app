import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { logoutAction } from '../../redux/ActionCreators';
import { connect } from 'react-redux';
import {GearFill} from 'react-bootstrap-icons'
import Axios from 'axios';

import {logout_url} from '../routes';

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
    var history = useHistory();
    const handleSignOut = () =>{
        console.log("toke: ", props.jwt_token);
        
        Axios.get(logout_url, {
            headers:{
                'Authorization': `bearer ${props.jwt_token}`
            },
            withCredentials: true,
        }).then(res => {
            console.log("response: ", res.data);
            
            if(res.data.logout){
                props.logout();
            }
        });
    }
    const handleNav = (route: string) =>{
        return history.push(route);
    }
    const buttons_loggedIn = (
        <div className="justify-content-end" style={{display: "flex", flexDirection: "row"}}>
            <Nav.Link onClick={() => {handleSignOut(); handleNav('/SMFSReact_app/admin');}}>Sign Out</Nav.Link>
            <Nav.Link onClick={() => handleNav('/SMFSReact_app/admin')}>Create Post </Nav.Link>
        </div>
    );

    const buttons_notloggedIn = (
        <div style={{display:"flex", flexDirection:"row"}}>
            <Nav.Link onClick={() => handleNav('/SMFSReact_app/register')} className="justify-content-end"> Signup </Nav.Link>
            <Nav.Link onClick={() => handleNav('/SMFSReact_app/login')} className="justify-content-end"> Login </Nav.Link>
        </div>
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
                        {props.isLoggedIn ? 
                            <React.Fragment>
                                <Dropdown.Item onClick={() => handleNav('/SMFSReact_app/')}>Home</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleNav('/SMFSReact_app/admin')}>Create Post</Dropdown.Item>
                                <Dropdown.Item onClick={() => {handleSignOut(); handleNav('/SMFSReact_app/login')}}>Sign Out</Dropdown.Item> 
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Dropdown.Item onClick={() => handleNav('/SMFSReact_app/login')}>Login</Dropdown.Item> 
                                <Dropdown.Item onClick={() => handleNav('/SMFSReact_app/register')}>Sign Up</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleNav('/SMFSReact_app/')}>Home</Dropdown.Item>
                            </React.Fragment>
                        }
                        
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </React.Fragment>
    )
    return(
        
        <Navbar variant="dark" bg="dark" sticky="top" style={{height:"40px", marginBottom:"10px"}}>
            <Navbar.Brand><Link to="/SMFSReact_app/" style={{color: "#ffff"}}>Internships</Link></Navbar.Brand>
            {window.innerWidth > 800 ?  <Nav.Link onClick={() => handleNav('/SMFSReact_app/')}>Home</Nav.Link> : null}
            <Navbar.Collapse className="justify-content-end">
                {window.innerWidth > 800 ?  desktopNavbar : mobileNavbar}
            </Navbar.Collapse>
            
        </Navbar>
    );
}

export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(NavComponentBasic);