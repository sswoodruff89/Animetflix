class Api::MoviesController < ApplicationController

  def index
    if params[:genre_id]
      @movies = Genre.find(params[:genre_id]).movies.includes(:genres)
    # elsif params[:watchlist_id]
    else
      @movies = Movie.all.includes(:genres)
    end

    render :index
  end

  def show
    @movie = Movie.find(params[:id])

    render :show
  end
end
