class Api::MoviesController < ApplicationController
  include MoviesControllerFilter

  def index
    if params[:genre_id]
      @movies = Genre.find(params[:genre_id]).movies.includes(:genres)
    # elsif params[:watchlist_id]
    elsif params[:search_query]

      @movies = search_filter_list(params[:search_query])
    else
      
      @movies = Movie.all.includes(:genres)
    end

    if (@movies.length == 0)
      render json: ["No movies found"], status: 404
    else
      render :index
    end
  end

  def show
    @movie = Movie.find(params[:id])

    render :show
  end
end
