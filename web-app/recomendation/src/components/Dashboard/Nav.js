import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom'
import playroomLogo from '../Landing/img/logo.png';
import Button from 'react-bootstrap/Button';

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        const Nav = styled.nav`
        height: 50px;
        font-family: Helvetica, Arial, sans-serif;
        img {
            width: 170px;
            height : 35px;
            
        }
        .logo {
            display: inline-block;
            margin: 8px 0 0 -15px;
        }`;

        const LogoutButton = styled(Button)`
        color: white;
        cursor: pointer;
        background-color: #c904c9;
        line-height: normal;
        margin: 0 0 0 0;
        padding: 7px 17px;
        font-weight: 100;
        border: transparent;
        border-radius: 3px;
        font-size: 16px;
        text-decoration: one;
        ${props => props.right && css`
            float: right;
        `}
        &:hover {
            background-color: #ff40ff;
        }
    `;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <Nav>
                        <a href={"/dashboard"} className="logo">
                            <img src={playroomLogo} alt="Playroom Logo" />
                        </a>
                        
                    </Nav>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar1"
                        aria-controls="navbar1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-conten-md-center" id="navbar1">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/demografico">Demografico</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse justify-conten-md-center" id="navbar1">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/colaborativo">Colaborativo</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse justify-conten-md-center" id="navbar1">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/mixto">Mixto</Link>
                            </li>
                        </ul>
                    </div>
                    <LogoutButton onClick={this.logout} right="true" >Logout</LogoutButton>
                </nav>
                
            </div>
            
        )
    }
}
export default withRouter(Nav);

