import {Navbar, Nav, NavItem, Button,} from 'react-bootstrap';
 
import React, {Component} from 'react';
 
import Sidebar from 'react-bootstrap-sidebar';


class LeftNav extends Component {
    constructor() {
        super()
        this.state = {
            isVisible: false,
          };
    }
    updateModal(isVisible) {
    	this.state.isVisible = isVisible;
      this.forceUpdate();
    }
    render() {
        return (
            <div>
        </div>
        )
    }
}

export default LeftNav