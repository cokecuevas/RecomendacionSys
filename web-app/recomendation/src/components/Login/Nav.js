import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import playroomLogo from '../Landing/img/logo.png';
import Button from 'react-bootstrap/Button';

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const Nav = styled.nav`
    height: 90px;
    font-family: Helvetica, Arial, sans-serif;
    img {
        width: 200px;
        height : 35px;
        vertical-align: middle;
    }
    .logo {
        display: inline-block;
        line-height: 90px;
        margin: 0 0 0 3%;
    }`;

        return (
            <Nav>
                <a href={"/"} className="logo">
                    <img src={playroomLogo} alt="Playroom Logo" />
                </a>
            </Nav>
        )
    }
}
export default withRouter(Nav);

