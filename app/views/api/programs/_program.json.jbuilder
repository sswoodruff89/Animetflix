
json.extract! program, :title, :rating, :id

if (program.program_type == "Movie") 
  json.runtime program.get_runtime
else 
  json.seasons program.seasons
end

json.program_type program.program_type
json.director program.director
json.genreIds program.genre_ids

#COMMENT DURING TESTING
if (program.thumbnail.attached?)
  json.thumbnail url_for(program.thumbnail)
else 
#
  json.thumbnail image_url("gokutemp.jpg")
end

#COMMENT DURING TESTING
#
if (program.thumbclip.attached?)
    json.thumbclip url_for(program.thumbclip)
elsif (program.clip.attached?)
    json.thumbclip url_for(program.clip)
end
#

#
if (program.logo.attached?)
  json.logo url_for(program.logo)
else 

  json.logo image_url("dragonball_super_broly_logo.png")
#
end
#

if (details)
  
  json.description program.description
  json.yr program.yr
  json.score program.score
  json.production_company program.production_company


#
  if (program.background.attached?)
    json.background url_for(program.background)
  else 
#
    json.background image_url("dbs_broly_back.png")
#
  end

#
  if (program.clip.attached?)
    json.clip url_for(program.clip)
  end
#
end