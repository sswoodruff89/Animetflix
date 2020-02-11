class Api::ProgramsController < ApplicationController
  include ProgramsControllerFilter

  def index
    if params[:genre_id]

      # refactor to fetch movies per list

      @programs = Genre.find(params[:genre_id]).programs.with_attached_logo.includes(:genres)
    else
      @programs = Program.with_attached_logo.all.includes(:genres)
    end
    
    if (@programs.length == 0)
      render json: ["No programs found"], status: 404
    else
      render :index
    end
  end

  def show
    # debugger
    @program = Program.find(params[:id])
    # @movie = Program.with_attached_thumbnail.with_attached_background.with_attached_logo.find(params[:id])

    render :show
  end
  
  def search
      @query = params[:search_query];
      if @query.length > 0
        @programs = search_filter_list(params[:search_query])
        if (@programs.length == 0)
          render json: ["No movies / shows found"], status: 404
        else
          render :search
        end
      end
  end 

  def watchlist

    @programs = Profile.find(params[:profile_id]).watched_programs.includes(:genres)
    
      if (@programs.length == 0)
        render json: ["No movies / shows found"], status: 404
      else
        render :index
      end
  end

end