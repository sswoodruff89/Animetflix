class Api::ProfilesController < ApplicationController
     def index
        @profiles = current_user.profiles
        render :index
    end
   
    def show
        @profile = Profile.includes(:likes).find(params[:id])
        
        profile_login(@profile)

        render :show
    end

    def create
        @profile = Profile.new(profile_params)
        @profile.user_id = current_user.id

        if @profile.save
            render :show
        else
            render json: ["Profile name is invalid"]
        end
    end

    def update
        @profile = Profile.find(params[:id])
        
        if @profile.update_attributes(profile_params)
            render :show
        else
            render json: ["Profile name is invalid"]
        end

    end

    def destroy
        @profile = Profile.find(params[:id])

        if (current_user.profiles.length > 1)
            @profile.destroy
            render :show
        else
            render json: ["Profile can't be deleted"]
        end
    end

    private

    def profile_params
        params.require(:profile).permit(:name, :profile_num)
    end

end
