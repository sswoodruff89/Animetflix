class Api::WatchlistsController < ApplicationController

  def create 
    # debugger
    @watchlist = Watchlist.new(movie_id: params[:movie_id], user_id: current_user.id)
    if @watchlist.save
      render :show
    else
      render json: ["Already on watchlist"], status: 404
    end
  end

  def destroy
    @watchlist = Watchlist.find(params[:id])
    @watchlist.destroy

    render :show
  end


end
