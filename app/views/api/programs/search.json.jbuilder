
def searchlist(program, query)
  if (program.title.downcase.starts_with?(query.downcase))
    return program.title
  elsif (program.director.downcase.starts_with?(query.downcase))
    return program.director
  else
    genres = program.genres
    genres.each do |genre|
      if (genre.name.downcase.starts_with?(query.downcase))
        return genre.name
      else
        next
      end
    end
  end
  return nil
end

def include_searchlist(program, query)
  if (!program.title.downcase.starts_with?(query.downcase) && program.title.downcase.include?(query.downcase))
    return program.title
  elsif (!program.director.downcase.starts_with?(query.downcase) && program.director.downcase.include?(query.downcase))
    return program.director
  else
    genres = program.genres
    genres.each do |genre|
      if (!genre.name.downcase.starts_with?(query.downcase) && genre.name.downcase.include?(query.downcase))
        return genre.name
      else
        next
      end
    end
  end
  return nil
end

@searchlist = []

json.programs do
  @programs.each do |program|
    if (@searchlist.length < 10)
      search_item = searchlist(program, @query);
      @searchlist.push(search_item) if (!@searchlist.include?(search_item))
    end 

    json.set! program.id do
      json.partial! "program", program: program, details: false
    end
  end
end

if (@searchlist.length < 10)
    @programs.each do |program|
      search_item = include_searchlist(program, @query);
      @searchlist.push(search_item) if (!@searchlist.include?(search_item))
      break if (@searchlist.length == 10)
    end
end

json.searchlist @searchlist.compact
