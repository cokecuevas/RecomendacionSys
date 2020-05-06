import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import playroomLogo from './img/logo.png';
import Button from 'react-bootstrap/Button';

class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        e.preventDefault()
        this.props.history.push('/login')
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
    }
`;

        const SignInButton = styled(Button)`
    color: white;
    cursor: pointer;
    background-color: #FF00FF;
    line-height: normal;
    margin: 29px 3% 0 0;
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
            <Nav>
                        <a href={"/"} className="logo">
                            <img src={playroomLogo} alt="Playroom Logo" />
                        </a>
                        <SignInButton onClick={this.onClick} right="true" >Sign In</SignInButton>        
                    </Nav>
                
        )
    }
}
export default withRouter(Nav);

