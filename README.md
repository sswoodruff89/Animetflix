<h1 align="center">
  <img alt="logo" src="https://animetflix-app.herokuapp.com/assets/animetflix_logo_blue-5ea3158236bf6183d57c29cbc933b812f3c7ef2621e8e13457cff32416331ba3.png" width="600" height="120">
</h1>
<h3 align="center">ANIMETFLIX STREAMING</h3>

------

## Introduction
Welcome to Animetflix, the hot new streaming service catered to your Anime viewing needs! The moment you sign up, you have access to a bountiful collection of Anime movies organized into toggleable carousels based on their genres. Slide back and forth across each list at the press of a button or search the database directly with a search input in the header. See a movie you like and want to watch later? Just click the "My List" button and a new list will appear before your eyes on the browser filled with the movies you want to watch. 

## Demo
This app was built with Ruby on Rails and React Redux. Please checkout a working demo right here: https://animetflix-app.herokuapp.com/#/
## 

## Built With
* Ruby on Rails
* React Redux


## Features

<h1 align="center">
  <img src="https://github.com/sswoodruff89/Animetflix/blob/master/app/assets/images/demo/scroll_gif.gif?raw=true" width="600" height="auto" align="center"/>
</h1>

### Movie List Carousel

The first major challenge of building this app was making a clean, scrollable carousel of movies per genre that was not smooth when going back and forth but also handled lists of varying length. Getting the structure of each list down was pretty straightforward-- each list being a 'ul' of movie items --which would then be slid back and forth inside another container with a hidden overflow. The amount of movement was the real challenge. Keeping the page as responsive as possible to the window size meant setting most units of measurement to percentages or viewing width. I also had to make sure a list would scroll off the screen when it reached it's end.

To solve this issue, I had to track several properties in the MovieList component state:

```javascript

class MovieList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      displayType: this.props.displayType,
      lastMovie: 6,
      nearEnd: (this.props.movies.length - 6) < 6,
      tilEnd: ((this.props.movies.length - 6)),
      slideCount: 0
    };
////////
  toggleRight(e) {
    e.preventDefault();
    let { slideCount, lastMovie, tilEnd } = this.state;

    if (tilEnd <= 0) {
      slideCount = 0;
      lastMovie = 6;
      tilEnd = this.props.movies.length - 6;
    } else {
      slideCount += 1;
      lastMovie += (tilEnd < 6) ? tilEnd : 6;
      tilEnd -= 6;
    }

    this.setState({ lastMovie, slideCount, tilEnd });
  }

  toggleLeft(e) {
    e.preventDefault();
    let {slideCount, lastMovie, tilEnd } = this.state;
    
    if (slideCount > 0) {
      slideCount -= 1;
      tilEnd += 6;
      lastMovie -= (tilEnd < 6) ? tilEnd : 6;
      this.setState({slideCount, lastMovie, tilEnd});
    }
  }
```
* List Length (this.props.movies.length): the number of movies in a list
* lastMovie: the nth movie item currently displayed in the slide
* nearEnd: a boolean checking if the scroll is near the end
* tilEnd: the number of movies left in the list
* slideCount: the number of times the list had moved left, 0 being the first six movies

With these states, I was able to keep track of where a user is on the list and how far they had left to go before reaching the end. If the user toggles past the end, those states reset and the list slides back to the beginning.

```javascript
    let slideMovePercentage;
    if (slideCount === 0) {
      slideMovePercentage = 0;
    } else {
      let endPercentage = (tilEnd && tilEnd < 6 && lastMovie % 6 > 0) ? (
        (100 - ((lastMovie % 6) / 6) * 100)
      ) : 0;
      slideMovePercentage = ((100 * (slideCount)) - (endPercentage));
    }

 //////Style attribute to move list left/right//////
    const listRange = {
      transform: `translateX(-${slideMovePercentage}%)`,
      transition: "all 0.8s ease-out"
    };
    
    <ul className="movie-slider" style={listRange}>

      ///ALL MOVIE ITEMS///
    </ul>
```
With the given component states, translated the 'ul' movie list along the X axis by 100% * this.state.slideCount, subtracting a percentage based on the remaining movies if near the end.

### Movie Item Hover and Details Page Animation
<h1 align="center">
  <img src="https://github.com/sswoodruff89/Animetflix/blob/master/app/assets/images/demo/movie_list_item_animation.gif?raw=true" width="600" height="auto" align="center"/>
</h1>




