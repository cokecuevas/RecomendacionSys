import React, { Component } from 'react'
import { register } from '../UserFunctions'
import { header } from '../Style/Header'
import Nav from '../Login/Nav'
import backgroundImage from './Images/background.jpg'
import FormBoos from 'react-bootstrap/Form';
import { RegisterForm } from '../Style/RegisterForm'
import AnimatedMulti from './Selector'

const Header = header(backgroundImage)
const Form = RegisterForm(FormBoos)

class Register extends Component {
    constructor() {
        super()
        this.state = {
            Age: '',
            Gender: '',
            Occupation: '',
            Email: '',
            Preferences: null,
            Password: '',
            colourOptions : [
                {value:'Action',label:'Action'},
                {value:'Adventure',label:'Adventure'},
                {value:'Animation',label:'Animation'},
                {value:'Children',label:'Children'},
                {value:'Comedy',label:'Comedy'},
                {value:'Crime',label:'Crime'},
                {value:'Documentary',label:'Documentary'},
                {value:'Drama',label:'Drama'},
                {value:'Fantasy',label:'Fantasy'},
                {value:'Film_Noir',label:'Film_Noir'},
                {value:'Horror',label:'Horror'},
                {value:'Musical',label:'Musical'},
                {value:'Mystery',label:'Mystery'},
                {value:'Romance',label:'Romance'},
                {value:'SciFi',label:'SciFi'},
                {value:'Thriller',label:'Thriller'},
                {value:'War',label:'War'},
                {value:'Western',label:'Western'},
                {value: 'Unknown', label:'Unknown'},
                ],
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    orderOptions = values => {
        return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
      };

    handleChange = (value, { action, removedValue }) => {
        const { colourOptions, Preferences } = this.state;
        switch (action) {
            case 'remove-value':
            case 'pop-value':
            if (removedValue.isFixed) {
                return;
            }
            break;
            case 'clear':
                Preferences = colourOptions.filter(v => v.isFixed);
            break;
        }
        this.setState({ Preferences: this.orderOptions(value) });
    }

    onSubmit(e) {
        e.preventDefault()
        const newUser = {
            Age: this.state.Age,
            Gender: this.state.Gender,
            Occupation: this.state.Occupation,
            Email: this.state.Email,
            Password: this.state.Password,
            Preferences: this.state.Preferences
        }
        register(newUser).then(res => {
            if (res !== 500) {
                if (!res.status) {
                    this.props.history.push('/login')
                } else {
                    this.setState({ error: res.data.Message });
                    this.setState({ loading: false });
                }
            } else {
                this.setState({ error: "Server is not reachable" });
                this.setState({ loading: false });
            }

        })
    }

    render() {
        const { Preferences, colourOptions } = this.state;
        return (
            <Header>
                <Nav />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <Form noValidate onSubmit={this.onSubmit}>
                                <h1 style={{ color: 'white', fontSize: "32px", margin: "0 0 28px 0" }}>Register</h1>
                                <div className="form-group">
                                    <AnimatedMulti
                                        onChangeFx={this.handleChange}
                                        value={Preferences}
                                        colourOptions={colourOptions}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <input type="text"
                                            className="form-control"
                                            name="Age"
                                            placeholder="Enter Age"
                                            value={this.state.Age}
                                            onChange={this.onChange}
                                            pattern="[0-9]*"
                                        />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text"
                                            className="form-control"
                                            name="Gender"
                                            placeholder="Enter Gender"
                                            value={this.state.Gender}
                                            onChange={this.onChange}
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        name="Occupation"
                                        placeholder="Enter Occupation"
                                        value={this.state.Occupation}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control"
                                        name="Email"
                                        placeholder="Enter email"
                                        value={this.state.Email}
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
                                <button type="submit" className="btn btn-lg btn-primary btn-block" style={{margin: "28px 0 0 0",color: "white",backgroundColor: "#FF00FF"}}>
                                    Register
                            </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Header>
        )
    }
}
export default Register