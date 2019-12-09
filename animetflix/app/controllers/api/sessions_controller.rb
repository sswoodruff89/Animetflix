class Api::SessionsController < ApplicationController

    # skip_before_action :verify_authenticity_token

    def create
        @user = User.find_by_cred(params[:user][:email], params[:user][:password])
        # debugger
        if @user
            login(@user)
            render "api/users/show"
        else
            render json: [@user.errors.full_messages], status: 404
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
