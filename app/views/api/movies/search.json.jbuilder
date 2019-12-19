
def searchlist(movie, query)
  if (movie.title.downcase.starts_with?(query.downcase))
    return movie.title
  elsif (movie.director.downcase.starts_with?(query.downcase))
    return movie.director
  else
    genres = movie.genres
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

def include_searchlist(movie, query)
  if (!movie.title.downcase.starts_with?(query.downcase) && movie.title.downcase.include?(query.downcase))
    return movie.title
  elsif (!movie.director.downcase.starts_with?(query.downcase) && movie.director.downcase.include?(query.downcase))
    return movie.director
  else
    genres = movie.genres
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

json.movies do
  @movies.each do |movie|
    if (@searchlist.length < 10)
      search_item = searchlist(movie, @query);
      @searchlist.push(search_item) if (!@searchlist.include?(search_item))
    end 

    json.set! movie.id do
      json.partial! "movie", movie: movie, details: false
    end
  end
end

if (@searchlist.length < 10)
    @movies.each do |movie|
      search_item = include_searchlist(movie, @query);
      @searchlist.push(search_item) if (!@searchlist.include?(search_item))
      break if (@searchlist.length == 10)
    end
end

json.searchlist @searchlist
