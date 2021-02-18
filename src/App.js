import React, {Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    console.log("Hello Console");
    this.popSearch();

  }

  popSearch() {
    console.log("Performing search with MDB");
    const urlString = "https://api.themoviedb.org/3/movie/popular?api_key=9198fa6d9a9713bc6b03ee9582525917&language=en-US&page=1"
    $.ajax({
      url: urlString,
      success: (seaarchResults) => {
        console.log("Fetched succesully");
        const results = seaarchResults.results;
        var movieRows = [];
        results.forEach((movie) => {
          movie.poster_src = "https://www.themoviedb.org/t/p/w220_and_h330_face" + movie.poster_path;
          console.log(movie.poster_path);
          const movieRow = <MovieRow key={movie.id} movie={movie}/>;
          movieRows.push(movieRow);
        })
        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch");
      }
    })
  }

  render() {
    return (
        <div className='container-fluid movie-app'>
          <div class="wrapper">
            <div className='row'>
              <tr>
                <td>
                  <img alt="app icon" width="50" src="TRIFYLLI.jpg" />
                </td>
                <td width="8"/>
                <td>
                  <h1>popMovieDB</h1>
                </td>
              </tr>
              {this.state.rows}
            </div>
          </div>
        </div>

    );
  }
}

export default App;
