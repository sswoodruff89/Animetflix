class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?, :login, :logout

    def current_user
        return unless session[:session_token]
        User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def login(user)
        session[:session_token] = user.session_token
    end

    def logout
        current_user.reset_token!
        session[:session_token] = nil
    end

    # def ensure_logged_in

    # end
end
