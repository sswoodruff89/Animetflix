class Api::ProfilesController < ApplicationController

    def create
        @profile = Profile.new(profile_params)
        @profile.user_id = current_user.user_id

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
        @profile.destroy
        render :show
    end

    private

    def profile_params
        params.require(:profile).permit(:name)
    end

end
