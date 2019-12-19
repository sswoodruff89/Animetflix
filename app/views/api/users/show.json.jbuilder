json.user do
    json.partial! "api/users/user", user: @user
end

json.watchlist do
  @user.watchlists.each do |watch|
    json.set! watch.movie_id do
      json.id watch.id
    end
  end
end
