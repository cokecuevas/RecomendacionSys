import StarRatings from 'react-star-ratings';
import React, { Component } from 'react'

class Rating extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rate: null
    }
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
  }


  getStars() {
    return 5 * (this.props.rate)/this.props.max_rate
  }

  render() {
    // rating = 2;
    let stars = this.getStars()
    return (
      <StarRatings
        rating={stars}//{this.state.rating}
        starRatedColor="gold"
        //changeRating={this.changeRating}
        numberOfStars={5}
        name='rating'
        starDimension="20px"
        starSpacing="5px"
      />
    );
  }
}
export default Rating