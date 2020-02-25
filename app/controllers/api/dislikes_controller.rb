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
        @dislike = Dislike.new(program_id: params[:program_id], profile_id: current_profile.id)
        @dislike.profile_id = current_profile.id

        if !Like.exists?(program_id: @like.program_id, profile_id: current_profile.id) && @dislike.save!
            render :show
        else
            render json: {}
        end
    end

    def destroy
        @dislike = Dislike.find(params[:id])
        @dislike.destroy
        render :show
    end
end
