
@genres.each do |genre|
    json.set! genre.id do
      json.name genre.name
      json.program_ids genre.program_ids
      json.id genre.id
    end
end