json.extract! movie, :title, :rating, :id
json.runtime movie.get_runtime
json.director movie.director
json.genresIds movie.genre_ids

if (details)

  json.description movie.description
  json.yr movie.yr
  json.score movie.score
  json.genreIds movie.genre_ids

end