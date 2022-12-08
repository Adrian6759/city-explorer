import React from 'react';


class Weather extends React.Component {
    render() {
        console.log(this.props.data);
        return (
            // <div>{this.props.data}</div>
            
            this.props.data.map((day, idx) => (
                <div key={idx}>
                <p>Date: {day.date}</p>
                <p>Weather: {day.description}</p>
                </div>
            ))
      )

    }
}








export default Weather;