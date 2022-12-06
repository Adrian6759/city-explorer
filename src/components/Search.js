import React from 'react';
import map from '../images/map.png';
import restaurantData from '../data/restaurants.json';
import locationData from '../data/location.json';
import axios from 'axios';
import {Alert,Button} from 'react-bootstrap';

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      locationSearch: '',
      restaurantData: restaurantData,
      locationData: locationData,
      error: null,
    }
  }

  // this should query location IQ for geolocation data
  handleLocationSearch = async (e) => {
    e.preventDefault();
    let request = {
      method: 'GET',
      url: `https://us1.locationiq.com/v1/search?key=${ACCESS_KEY}&q=${e.target.search.value}&format=json`
    }


    // make our location IQ request;
    try {
      let response = await axios(request);
      this.setState({
        locationSearch: e.target.search.value,
        locationData: response.data[0],
      });
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
          : <p></p>
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
        {this.state.locationSearch && this.state.locationData
          ? <div id="map"><img src={map} alt="location map" /></div>
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

