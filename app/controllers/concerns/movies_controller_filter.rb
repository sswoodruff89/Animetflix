module MoviesControllerFilter

  def search_filter_list(query)
    list = Movie.all_filter(query).limit(18).includes(:genres)
    if (list.length < 18)

      remain = 18 - list.length
      list = (list + Movie.all_include_filter(query).includes(:genres)).uniq.take(18)
    end
  end
end