
@genres.each do |genre|
    json.set! genre.id do
      json.name genre.name
      json.program_ids genre.program_ids
      json.id genre.id
      json.viewer_points genre.viewer_points(genre.likes.where(profile_id: current_profile.id).count, 
                                              genre.dislikes.where(profile_id: current_profile.id).count, 
                                              genre.watches.where(profile_id: current_profile.id).count)
    end
end