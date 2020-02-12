class Api::GenresController < ApplicationController

  def index
    
    @genres = Genre.includes(:likes, :dislikes, :watches).all
    render :index
  end

end
