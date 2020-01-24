json.extract! movie, :title, :rating, :id
json.runtime movie.get_runtime
json.director movie.director
json.genreIds movie.genre_ids

#COMMENT DURING TESTING
if (movie.thumbnail.attached?)
  json.thumbnail url_for(movie.thumbnail)
else 
#
  json.thumbnail image_url("gokutemp.jpg")
end

#COMMENT DURING TESTING

if (movie.clip.attached?)
    json.clip url_for(movie.clip)
end

if (movie.logo.attached?)
  json.logo url_for(movie.logo)
else 
  json.logo image_url("dragonball_super_broly_logo.png")
end
#
if (details)
  json.description movie.description
  json.yr movie.yr
  json.score movie.score



  if (movie.background.attached?)
    json.background url_for(movie.background)
  else 
    json.background image_url("dbs_broly_back.png")
  end
end