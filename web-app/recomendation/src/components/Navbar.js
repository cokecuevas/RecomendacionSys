import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            notificationCount: '',
            firstNotification: false
        }
    }

    componentDidMount() {
        var since = 0
        setInterval(async () => {
            axios
        .get('http://localhost:8002/notification?since=' + since, {
            headers: { "Access-Control-Allow-Origin": "*", 'Authorization': 'Bearer ' + localStorage.userToken }
        })
        .then((res) => {
            this.setState({ notificationCount: res.data.Quantity })
            since = res.data.Data[0].Created
            console.log(since)
          })
          .catch(err => {
        })
            
        }, 3000);
    }

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('userToken')
        this.props.history.push('/')
    }

    getNotificationsSync() {
        try {
            console.log("getNotificationsSync")
            const settings = {
                method: 'GET',
                headers: { "Access-Control-Allow-Origin": "*", 'Authorization': 'Bearer ' + localStorage.userToken }
            };
            const res = fetch('http://localhost:8002/notification', settings);
            const blocks = res.json();
            this.setState({ notificationCount: blocks.Quantity });
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>

            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="http://www.google.cl">Watch</Link>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link" >Notification
                    <span className="badge" style={{ visibility: this.state.notificationCount > 0 ? 'visible' : 'hidden' }}>{this.state.notificationCount}</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">LogOut</a>
                </li>

            </ul>
        )



        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
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
                            <Link className="nav-link" to="http://www.logo.cl">Home</Link>
                        </li>
                    </ul>
                    {localStorage.userToken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)