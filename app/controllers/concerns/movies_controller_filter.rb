module MoviesControllerFilter

  def search_filter_list(query)
    list = Movie.title_filter(query).limit(18).includes(:genres)
    if (list.length < 18)
      list = (list + Movie.director_filter(query).includes(:genres)).uniq
    end
  end
end