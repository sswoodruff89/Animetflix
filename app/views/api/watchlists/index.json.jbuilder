@watchlist.each do |watchlist|
  json.set! watchlist.movie_id do
    json.extract! watchlist, :movie_id, :id, :created_at
  end
end