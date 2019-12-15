json.extract! movie, :title, :rating, :id
json.runtime movie.get_runtime
json.score movie.score
json.director movie.director
if (details)

  json.description movie.description
  json.yr movie.yr
  json.genres movie.list_genres
else
  json.genres movie.list_genres.take(3)
end