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


