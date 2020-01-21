class Api::MoviesController < ApplicationController
  include MoviesControllerFilter

  def index
    if params[:genre_id]

      # refactor to fetch movies per list

      @movies = Genre.find(params[:genre_id]).movies.with_attached_logo.includes(:genres)
    else
      @movies = Movie.with_attached_logo.all.includes(:genres)
    end
    
    if (@movies.length == 0)
      render json: ["No movies found"], status: 404
    else
      render :index
    end
  end

  def show
    
    @movie = Movie.find(params[:id])
    # @movie = Movie.with_attached_thumbnail.with_attached_background.with_attached_logo.find(params[:id])

    render :show
  end
  
  def search
      @query = params[:search_query];
      if @query.length > 0
        @movies = search_filter_list(params[:search_query])
        if (@movies.length == 0)
          render json: ["No movies found"], status: 404
        else
          render :search
        end
      end
  end 

  def watchlist

    @movies = Profile.find(params[:profile_id]).watched_movies.includes(:genres)
    
      if (@movies.length == 0)
        render json: ["No movies found"], status: 404
      else
        render :index
      end
  end

end
