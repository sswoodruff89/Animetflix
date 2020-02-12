
@genres.each do |genre|
    json.set! genre.id do
      json.name genre.name
      json.program_ids genre.program_ids
      json.id genre.id
      json.viewer_points genre.viewer_points(genre.likes.count, genre.dislikes.count, genre.watches.count)
    end
end