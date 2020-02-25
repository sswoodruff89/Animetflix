class Api::ProgramsController < ApplicationController
  include ProgramsControllerFilter

  def index
    if params[:genre_ids]
      @programs = []
      Genre.includes(:programs).find(params[:genre_ids]).each {|genre| @programs.push(*genre.programs.limit(24))}
      @programs = (@programs + current_profile.watched_programs).uniq
      
    elsif params[:type]
      @programs = Program.with_attached_logo.where(program_type: params[:type])

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

    @program = Program.find(params[:id])
    # @movie = Program.with_attached_thumbnail.with_attached_background.with_attached_logo.find(params[:id])

    render :show
  end
  
  def search
      @query = params[:search_query];

      if @query.length > 0
        @programs = search_filter_list(@query)
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
