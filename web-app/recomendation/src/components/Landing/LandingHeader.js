import React, { Component } from 'react'
import Nav from './Nav'
import Title from './Title'
import { withRouter } from 'react-router-dom';

class LandingHeader extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <Title />
            </div>
        )
    }
}

export default withRouter(LandingHeader);

