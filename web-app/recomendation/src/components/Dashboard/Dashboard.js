import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import TopNav from './Nav'


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            FirstName: '',
            LastName: '',
            Email: ''
        }
    }
    componentDidMount() {
        const token = localStorage.userToken
        const decoded = jwt_decode(token)
        this.setState({
            FirstName: decoded.identity.FirstName,
            LastName: decoded.identity.LastName,
            Email: decoded.identity.Email
        })
        console.log(this)
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        return (
            <div>
            <TopNav>
            
            </TopNav>
            
            </div>
        )
    }
}

export default Dashboard