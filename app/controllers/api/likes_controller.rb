class Api::LikesController < ApplicationController
    def index
        if logged_in?
            @likes = current_profile.likes
            if @likes
                render :index
            else
                render json: {}
            end
        end
    end

    def create
        @like = Like.new(program_id: params[:program_id], profile_id: current_profile.id)

        if @like.save!
            render :show
        else
            render json: {}
        end
    end

    def destroy
        @like = Like.find(params[:id])
        @like.destroy
        render :show
    end
end
