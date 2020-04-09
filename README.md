<h1 align="center">
  <img alt="logo" src="https://github.com/sswoodruff89/Animetflix/blob/master/app/assets/images/animetflix_logo_blue.png" width="600" height="120">
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
* AWS
* Heroku

## Interactions
Toggle through each list of movies, and as you hover over each thumbnail, it's clip will begin playing. On the thumbnail, you can go directly to the movie's watch page with the play button, add it to your watchlist with the watchlist button, or open the details page with the down arrow. The details page will display a synopsis, MPAA rating, a score (based on 5-stars), runtime, and genres with the clip playing in the background.

If you want to search for movies, open up the search bar and type in to get live results, along with a list of possible titles, directors, and genres you are looking for that will link you to a new set of results.

On the watch page, enjoy your movie of choice!


## Features

<h1 align="center">
  <img src="https://github.com/sswoodruff89/Animetflix/blob/master/app/assets/images/demo/scroll_gif.gif?raw=true" width="600" height="auto" align="center"/>
</h1>


### Movie List Carousel

The first major challenge of building this app was making a clean, scrollable carousel of movies per genre that was not only smooth when going back and forth but also handled lists of varying length. Getting the structure of each list down was pretty straightforward-- each list being a 'ul' of movie items --which would then be slid back and forth inside another container with a hidden overflow. The amount of movement was the real challenge. Keeping the page as responsive as possible to the window size meant setting most units of measurement to percentages or viewing width. I also had to make sure a list would scroll off the screen when it reached it's end.

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

Going off the previous challenge, getting the thumbnails to interact with the mouse over and displaying details when clicked proved even greater. I implemented some of the solution of moving the list by translating each thumbnail a percentage amount across the list when one is hovered over. Formatting the following siblings of the hovered item was no problem, but there is no selector for an elements previous siblings. After tireless css rendering and research, I came upon a solution that allowed me to use a container element I had already made that was simply meant to hold the list.

```css

///HOVERED THUMBNAIL
.movie-item:hover{
  position: relative;
  transform: scale(1.6) !important;
  transition-property: all 1s ease;
  // transition-delay: 500ms;
  z-index: 10;
}
///All THUMBNAILS AFTER HOVERED THUMBNAIL
.movie-item:hover ~ .movie-item{
  transform: translateX(29.5%);
  transition-property: all 0.5s ease;
  // transition-delay: 500ms;
  transition-duration: 0.5s;
}

///ALL THUMBNAILS BEFORE HOVERED THUMBNAIL
.movie-slider:hover .movie-item {
    transform: translateX(-29.5%);
    transition-property: all;
    // transition-delay: 500ms;
    transition-duration: 0.5s;

}
```
Since the user will be hovering over the .movie-slider container that is holding my 'ul' no matter which thumbnail is focused on, I was able to select the thumbnail's previous siblings.

As for rendering the details of a given movie when selected, I placed a MovieDetail component after each .movie-slider container and wrapped them both is a 'section' tag. The details only render when the URL pathname has the list name and the movie ID, which is pushed to the history by the thumbnail's down-arrow button.  Any lists that follow are pushed down as the detail's page fades and slides in, thanks to keyframe animations. To animate it's exit, it's class is changed by the component state, reducing it's height and opacity to 0 before the previous pathname is pushed back to the history.


### Search Page

<h1 align="center">
  <img src="https://media.giphy.com/media/kDqkmLmVtOQhydPqxI/giphy.gif" width="600" height="auto" align="center"/>
</h1>


For the search engine, I redirect to the search page the moment the user starts typing in the nav bar, and I the query isn't sent to the back end until the user stops typing. The request is sent to a collection route "search", and the controller diverts the fetched data to the "search" view. As the response is being built by Jbuilder, a recommendations list of titles, directors, and genres is created based on specific matches, starting with matches that begin with the query. If the list is underfilled, then the list will be filled with matches that include the query.

```javascript
def searchlist(program, query)
  if (program.title.downcase.starts_with?(query.downcase))
    return program.title
  elsif (program.director.downcase.starts_with?(query.downcase))
    return program.director
  else
    genres = program.genres
    genres.each do |genre|
      if (genre.name.downcase.starts_with?(query.downcase))
        return genre.name
      else
        next
      end
    end
  end
  return nil
end

def include_searchlist(program, query)
  if (!program.title.downcase.starts_with?(query.downcase) && program.title.downcase.include?(query.downcase))
    return [program.title]
  elsif (!program.director.downcase.starts_with?(query.downcase) && program.director.downcase.include?(query.downcase))
    return [program.director]
  else
    genres = program.genres
    genreNames = [];
    genres.each do |genre, i|
      if (!genre.name.downcase.starts_with?(query.downcase) && genre.name.downcase.include?(query.downcase))
        return [genre.name]
      else
        genreNames.push(genre.name);
        next
      end
    end
    return [program.title, program.director, *genreNames.uniq]
  end
end

########

@searchlist = []

json.programs do
  @programs.each do |program|
    if (@searchlist.length < 10)
      search_item = searchlist(program, @query);
      @searchlist.push(search_item) if (!@searchlist.include?(search_item))
    end 

    json.set! program.id do
      json.partial! "program", program: program, details: false
    end
  end
end

if (@searchlist.length < 12)
    @programs.each do |program|
      search_item = include_searchlist(program, @query);
      @searchlist.push(*search_item)
      break if (@searchlist.length >= 20)
    end
end

json.searchlist @searchlist.compact.uniq.take(12)
```
Once the frontend receives the response, the search page renders not only the matching movies and shows but also turns that list of recommendations into a separate links that will update the search page when clicked. If a search result returns only one film or show, the recommendations list will include the director and genres, so when the user is going through the searches, they will never feel like they have hit a dead end.

### Watch Page Movie Controller

<h1 align="center">
  <img src="https://github.com/sswoodruff89/Animetflix/blob/master/app/assets/images/demo/watch_page.gif?raw=true" width="600" height="auto" align="center"/>
</h1>

When creating the watch page, I crafted a custom video controller to interact with the video. Getting it alter the video proved extremely difficult, as several buttons and states directly affect and are simultaneously affected by the video's current time. The video progress bar is a combination of a 'progress' tag and an 'input[type="range"]', the latter of which scrolls through the runtime. The two skip buttons jump 10 seconds forward and back on the video, and the volume button reveals the volume slider when hovered over, and when clicked, mutes or unmutes the video.

