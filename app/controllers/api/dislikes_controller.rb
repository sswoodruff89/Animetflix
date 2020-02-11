class Api::DislikesController < ApplicationController
    def index
        if logged_in?
            @dislikes = current_profile.dislikes
            if @dislikes
                render :index
            else
                render json: {}
            end
        end
    end

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
