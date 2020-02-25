class Api::UsersController < ApplicationController

    # skip_before_action :verify_authenticity_token

    def create
        @user = User.new(user_params)

        if @user.save!
            name = @user.email.split("@").first
            @profile = Profile.new(name: name, user_id: @user.id, profile_num: 1)
            if @profile.save!
                login(@user)
                render :show
            end
        else
            render json: ["Invalid email / password"], status: 404
        end
    end


    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end
