import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Jason Bourne', Description: 'Jason Bourne is a 2016 American action-thriller film directed by Paul Greengrass and written by Greengrass and Christopher Rouse. It is the fifth installment of the Bourne film series and a direct sequel to The Bourne Ultimatum (2007). Matt Damon reprises his role as the main character, former CIA assassin Jason Bourne.', ImagePath: 'https://en.wikipedia.org/wiki/Jason_Bourne_(film)#/media/File:Jason_Bourne_(film).jpg' },
        { _id: 2, Title: 'A Star Is Born', Description: 'A Star Is Born is a 2018 American musical romantic drama film produced and directed by Bradley Cooper (in his directorial debut) and written by Cooper, Eric Roth and Will Fetters. It stars Cooper, Lady Gaga, Dave ', ImagePath: 'https://en.wikipedia.org/wiki/A_Star_Is_Born_(2018_film)#/media/File:A_Star_is_Born.png' },
        { _id: 3, Title: 'The Martian', Description: 'The Martian is a 2015 British-American science fiction film directed by Ridley Scott and starring Matt Damon. Drew Goddard adapted the screenplay from The Martian, a 2011 novel by Andy Weir. The film depicts an astronaut\'s lone struggle to survive on Mars after being left behind, and the efforts of NASA to rescue him and bring him home to Earth. It also stars Jessica Chastain, Jeff Daniels, Kristen Wiig, Chiwetel Ejiofor, Sean Bean, Michael Peña, Kate Mara, Sebastian Stan, Aksel Hennie, Mackenzie Davis, Donald Glover, and Benedict Wong.', ImagePath: 'https://en.wikipedia.org/wiki/The_Martian_(film)#/media/File:The_Martian_film_poster.jpg' }
      ],
      selectedMovie: null
    }
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });

    render(); {
      const { movies, selectedMovie } = this.state;

      if (selectedMovie) return <MovieView movie={selectedMovie} />;

      if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            ))
          }
        </div>
      );
    };
  }
}


export default MainView