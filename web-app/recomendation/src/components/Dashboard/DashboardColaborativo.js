import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import TopNav from './Nav'
import Movie from './Movie'
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";


class DashboardColaborativo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Email: '',
            Id: null
        }
        
    }
    componentWillMount() {
        const token = localStorage.userToken
        const decoded = jwt_decode(token)
        this.setState({
            Email: decoded.identity.Email,
            Id: decoded.identity.Id
        })
    }


    render() {
        return (
            <div>
                <TopNav />
                <div class="jumbotron" style={{height:"100vh",background:"black"}}>
                    <MDBContainer className="mt-5">
                        <MDBRow className="mt-4">
                            <Movie id_user={this.state.Id} type={"Colaborativo"}/>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default DashboardColaborativo