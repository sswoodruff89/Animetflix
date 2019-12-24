class Api::LikesController < ApplicationController

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
