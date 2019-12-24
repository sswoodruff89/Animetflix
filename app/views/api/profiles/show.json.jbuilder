json.partial! "profile", profile: @profile

json.watchlist do
  @profile.watchlists.each do |watch|
    json.set! watch.movie_id do
      json.id watch.id
      json.movie_id watch.movie_id
    end
  end
end