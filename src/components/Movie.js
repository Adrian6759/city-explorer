import React from 'react';
import Card from 'react-bootstrap/Card'

class Movie extends React.Component {
    render() {
        console.log('movie', this.props.data);
        return (
            this.props.data.map((movie) => (
                <div>
                    <Card key={movie} style={{width: '18rem'}}>
                        <Card.Title></Card.Title>
                    <Card.Body>Title: {movie.title}</Card.Body>
                    <Card.Body>Overview: {movie.overview}</Card.Body>
                    <Card.Body>Average Votes: {movie.avg}</Card.Body>
                    <Card.Body>Overview: {movie.total}</Card.Body>
                    <Card.Body>Overview: {movie.popularity}</Card.Body>
                    <Card.Body>Overview: {movie.release}</Card.Body>
                    </Card>
                </div >
            ))
        )

    }
}


export default Movie;