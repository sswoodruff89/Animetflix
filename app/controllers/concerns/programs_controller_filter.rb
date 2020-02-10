module ProgramsControllerFilter

  def search_filter_list(query)
    list = Program.all_filter(query).limit(24).includes(:genres)
    if (list.length < 24)
      remain = 18 - list.length
      list = (list + Program.all_include_filter(query).includes(:genres)).uniq.take(18)
    end
  end

  # def genre_search_filter_list(query)
  #   genre = Genre.genre_filter(query)

  # end
end