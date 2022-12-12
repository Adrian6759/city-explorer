import React from 'react';
// import Map from '../images/map.png';
import restaurantData from '../data/restaurants.json';
import locationData from '../data/location.json';
import axios from 'axios';
import {Alert,Button} from 'react-bootstrap';
import Weather from './/Weather.js'
import Movie from './/Movie.js'


const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;


class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      locationSearch: '',
      restaurantData: restaurantData,
      locationData: locationData,
      error: null,
      map: '',
      weatherArr: [],
      movieArr: []
    }
  }

  handleLocationSearch = async (e) => {
    e.preventDefault();
    let request = {
      method: 'GET',
      url: `https://us1.locationiq.com/v1/search?key=${ACCESS_KEY}&q=${e.target.search.value}&format=json`
    }


    try {
      let response = await axios(request);
       this.setState({
        locationSearch: e.target.search.value,
        locationData: response.data[0],
        map:`https://maps.locationiq.com/v3/staticmap?key=${ACCESS_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`
      },this.handleWeather);
    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
  handleWeather = async () => {
    let request = {
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.locationSearch}&lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}`
    }
    try {
      let response = await axios(request);
      console.log(response.data);
      this.setState({weatherArr:response.data})

    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
  handleMovie = async () => {
    let request = {
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER}/movie?searchQuery=${this.state.locationSearch}`
    }
    try {
      let responseMovie = await axios(request);
      console.log(responseMovie.data);
      this.setState({movieArr:responseMovie.data})

    } catch (err) {
      this.setState({ error: err.response.data });
    }
  }
  handleError = () => {
    this.setState({ error: null });
  }
  render() {
    return (
      <div id="city-search">
        <form onSubmit={this.handleLocationSearch}>
          <label>Search for a location</label>
          <input type="text" name="search" placeholder="Enter City here" />
          <button type="submit">Explore!</button>
        </form>
        {this.state.error
          ? <><Alert>Enter a valid response. </Alert><Button onClick={this.handleError}>Dismiss</Button></>
          : null
        }
        {this.state.locationData
          ? <p>{this.state.locationData.display_name}</p>
          : <p>Please search for a city!</p>
        }
        {this.state.locationData
          ? <p>{this.state.locationData.lat}</p>
          : <p>('')</p>
        }
        {this.state.locationData
          ? <p>{this.state.locationData.lon}</p>
          : <p>('')</p>
        }
        {this.state.weatherArr
          ? <Weather data={this.state.weatherArr}/>
          : <p>('')</p>
        }
        {this.state.movieArr
          ? <Movie data={this.state.movieArr}/>
          : <p>('')</p>
        }
        {this.state.locationSearch && this.state.locationData
          ? <div id="map"><img src={this.state.map} alt="location map" /></div>
          : null
        }
        {this.state.locationSearch && this.state.restaurantData
          ? <ul>{this.state.restaurantData.map(place => <li key={place.restaurant}>{place.restaurant}</li>)}</ul>
          : null
        }
      </div>
    )
  }
}

export default Search;

