json.partial! "profile", profile: @profile
json.showcase_id rand(Program.count + 1)

json.watchlist do
  @profile.watchlists.each do |watch|
    json.set! watch.program_id do
      json.id watch.id
      json.program_id watch.program_id
    end
  end
end

json.likes do
  @profile.likes.each do |like|
    json.set! like.program_id do
      json.id like.id
      json.program_id like.program_id
    end
  end
end