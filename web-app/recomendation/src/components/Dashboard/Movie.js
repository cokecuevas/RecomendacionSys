import React, { Component } from 'react'
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { demografico } from '../UserFunctions'
import { BoxLoading } from 'react-loadingg';
class Movie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Id: '',
            movies : null
        }
    }
    componentWillMount() {
        this.setState({ loading: true });
        
        demografico(this.props.id_user).then(
            res => {
                if(this.props.type == 'Demografico'){
                        this.setState({ movies: res.Items_demografico});
                        this.setState({ loading: false });
                }else if(this.props.type == 'Colaborativo'){
                    this.setState({ movies: res.Items_colaborativo});
                        this.setState({ loading: false });
                }else{
                    this.setState({ movies: res.Items_mixed});
                        this.setState({ loading: false });
                }   
            }
        )
        
    }

    render() {
        var peliculas = this.state.movies;
        if (this.state.loading == false){
        return (
            peliculas.map( item => (
            <MDBCol md="3">
                <MDBView>
                <img
                    src={item.Image}
                    className="img-fluid"
                    alt=""
                    style={{borderRadius:"15px",weight:"350px",height:"300px"}}
                />
                <MDBMask className="flex-center" overlay="teal-slight">
                    <p className="white-text" style={{color:"white"}}>{item.Movie}</p>
                </MDBMask>
                </MDBView>
            </MDBCol>
         ))
        )
    }else{
        
        return (
            <BoxLoading color = "#c904c9"/>
        )
    }
    }
}

export default Movie