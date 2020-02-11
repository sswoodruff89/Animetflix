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
        @like = Like.new(params[:movieId])

        if @like.save!
            render :show
        else
            render json: {}
        end
    end

    def destroy
        @like = Like.find(params[:likeId])
        @like.destroy
        render :show
    end
end
