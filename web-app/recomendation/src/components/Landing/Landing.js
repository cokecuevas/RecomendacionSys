import React, { Component } from 'react'
import LandingBody from './LandingBody'
import LandingHeader from './LandingHeader'
import LandingFooter from './LandingFooter'
import { header } from '../Style/Header'
import backgroundImage from './img/background2.png'

const Header = header(backgroundImage)

class Landing extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <Header>
                <div style={{ height: "100vh" }}>
                    <LandingHeader />
                </div>
                <div>
                    <LandingBody />
                </div>
                <div>
                    <LandingFooter />
                </div>
            </Header>
        )
    }
}

export default Landing