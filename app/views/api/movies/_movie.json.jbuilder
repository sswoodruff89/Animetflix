json.extract! movie, :title, :rating, :id
json.runtime movie.get_runtime
json.director movie.director
json.genreIds movie.genre_ids

if (details)

  json.description movie.description
  json.yr movie.yr
  json.score movie.score
  
end