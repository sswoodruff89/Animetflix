
@genres.each do |genre|
    json.set! genre.id do
      json.name genre.name
      json.movie_ids genre.movie_ids
      json.id genre.id
    end
end