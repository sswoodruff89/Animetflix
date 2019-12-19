class Api::WatchlistsController < ApplicationController
  
  def index
    if logged_in?
      @watchlist = current_user.watchlists
      
      if @watchlist
        render :index
      else
        render json: {}
      end
    end
  end

  def create 
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
