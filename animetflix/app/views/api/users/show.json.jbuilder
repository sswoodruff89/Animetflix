json.set! @user.id do
    json.partial! "user", user: @user
end