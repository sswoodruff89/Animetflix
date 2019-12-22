class Api::SessionsController < ApplicationController

    # skip_before_action :verify_authenticity_token

    def create
        @user = User.includes(:watchlists).find_by_cred(params[:user][:email], params[:user][:password])
        if @user
            login(@user)
            render "api/users/show"
        else
            if (User.find_by(email: params[:user][:email]))
                render json: ["Invalid password"], status: 404
            else
                render json: ["Invalid email"], status: 404
            end
        end

    end

    def destroy
        if logged_in?
            logout
            render json: {}
        else
            render json: ["No current user"], status: 404
        end
    end
end
