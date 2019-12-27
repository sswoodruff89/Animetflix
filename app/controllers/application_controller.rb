class ApplicationController < ActionController::Base
    
    protect_from_forgery with: :exception
    helper_method :current_user, :current_profile, :logged_in_with_profile?, :profile_login, :logged_in?, :login, :logout

    def current_user
        return unless session[:session_token]
        User.includes(:profiles).find_by(session_token: session[:session_token])
    end

    def current_profile
        return unless session[:profile_id]
        Profile.includes(:watchlists).find_by(id: session[:profile_id])
    end

    def profile_login(profile)
        session[:profile_id] = profile.id
    end

    def logged_in?
        !!current_user
    end

    def logged_in_with_profile?
        !!current_profile
    end

    def login(user)
        session[:session_token] = user.session_token
    end

    def logout
        current_user.reset_token!
        session[:session_token] = nil
        session[:profile_id] = nil
    end

    

    # def route_not_found
    #     render file: Rails.public_path.join('404.html'), status: :not_found, layout: false
    # end
    # def ensure_logged_in

    # end
end
