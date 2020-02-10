@watchlist.each do |watchlist|
  json.set! watchlist.program_id do
    json.extract! watchlist, :program_id, :id, :created_at
  end
end