module ProgramsControllerFilter

  def search_filter_list(query)
    list = Program.all_filter(query).limit(18).includes(:genres)
    if (list.length < 24)
      remain = 24 - list.length
      list = (list + Program.all_include_filter(query).includes(:genres)).uniq.take(24)

    end
    return list
  end

end