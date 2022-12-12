import React from 'react';
import Card from 'react-bootstrap/Card'

class Weather extends React.Component {
    render() {
        console.log('weather',this.props.data);
        return (
            // <div>{this.props.data}</div>

            this.props.data.map((day, idx) => (
                <div>
                    <Card key={idx} style={{width: '18rem'}}>
                        <Card.Title></Card.Title>
                    <Card.Body>Date: {day.date}</Card.Body>
                    <Card.Body>Weather: {day.description}</Card.Body>
                    </Card>
                </div >
            ))
        )

    }
}








export default Weather;