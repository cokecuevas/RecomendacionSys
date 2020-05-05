import React, { Component } from 'react'
import { login } from '../UserFunctions'
import { LoginForm } from '../Style/LoginForm'
import Nav from './Nav'
import { header } from '../Style/Header'
import backgroundImage from '../Login/img/background.jpg'
import FormBoos from 'react-bootstrap/Form';
import styles from '../Login/Style/login.module.css'

const Header = header(backgroundImage)
const Form = LoginForm(FormBoos)

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Email: '',
            Password: '',
            error: '',
            loading: false,
            isChecked : true
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const user = {
            Email: this.state.Email,
            Password: this.state.Password
        }
        this.setState({ loading: true });
        login(user).then(
            res => {
                if (res !== 500) {
                    if (!res.status) {
                        this.props.history.push('/demografico')
                    } else {
                        this.setState({ error: res.data.Message });
                        this.setState({ loading: false });
                    }
                } else {
                    this.setState({ error: "Server not reachable" });
                    this.setState({ loading: false });
                }
            },
        )
    }

    toggleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
      }

    render() {
        return (
            <Header>
                <Nav />
                <div>
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <Form noValidate onSubmit={this.onSubmit} >
                            <div className="form-group">
                                <h1 style={{ color: 'white', fontSize:"32px",margin: "0 0 28px 0"}}>Sign in</h1>
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control"
                                        name="Email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control"
                                        name="Password"
                                        placeholder="Enter Password"
                                        value={this.state.Password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button style={{margin: "28px 0 0 0",color: "white",backgroundColor: "#FF00FF"}} type="submit" className="btn btn-lg btn-primary btn-block" disabled={this.state.loading}>
                                    Sign in
                                </button>
                                <label className={styles.noselect}>
                                    <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange}/>
                                        <span style={{fontSize:"13px",color: "white",margin: "0 0 0 5px",fontWeight: "500"}}>Remember me</span>
                                </label>
                                
                                {this.state.error &&
                                    <div className={'alert alert-danger'}>{this.state.error}</div>
                                }
                            </Form>
                        </div>
                    </div>
                </div>
            </Header>
        )
    }
}
export default (Login);