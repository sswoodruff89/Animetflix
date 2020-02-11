class Api::DislikesController < ApplicationController

    def create
        @dislike = Dislike.new(params[:movieId])

        if @dislike.save!
            render :show
        else
            render json: {}
        end
    end

    def destroy
        @dislike = Like.find(params[:dislikeId])
        @dislike.destroy
        render :show
    end
end
