json.user do
    json.partial! "api/users/user", user: @user
end

json.profiles do
  @user.profiles.each do |profile|
    json.set! profile.id do
      json.name profile.name
      json.id profile.id
    end
  end
end

json.watchlist do
  @user.watchlists.each do |watch|
    json.set! watch.movie_id do
      json.id watch.id
      json.movie_id watch.movie_id
    end
  end
end
