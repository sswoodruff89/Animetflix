class Api::WatchlistsController < ApplicationController
  
  def index
    if logged_in?
      @watchlist = current_profile.watchlists
      if @watchlist
        render :index
      else
        render json: {}
      end
    end
  end

  def create 
    @watchlist = Watchlist.new(program_id: params[:program_id], profile_id: current_profile.id)
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
