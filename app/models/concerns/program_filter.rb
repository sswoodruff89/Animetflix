module ProgramFilter
  extend ActiveSupport::Concern

  module ClassMethods
    def title_filter(filter_query)
      filter_query = filter_query.downcase

      results = self.where("translate(title, ':;%', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end

    def director_filter(filter_query)
      filter_query = filter_query.downcase
      results = self.where("translate(director, ':;%', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end

    #FOR GENRE
    def genre_filter(filter_query)
      filter_query = filter_query.downcase
      results = self.where("translate(name, ':;%', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end
    ##

    def all_filter(filter_query)
      filter_query = filter_query.downcase

      results = self.joins(:genres).where("translate(genres.name, '%:;', '') ILIKE :start_query
        OR translate(title, ':;%', '') ILIKE :start_query
        OR translate(production_company, ':;%', '') ILIKE :start_query
        OR translate(director, ':;', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end

    def all_include_filter(filter_query)
      filter_query = filter_query.downcase

      results = self.where("translate(title, ':%;', '') ILIKE :start_query 
        OR translate(director, ':;%', '') ILIKE :start_query
        OR translate(production_company, ':;%', '') ILIKE :start_query", start_query: "%#{filter_query}%")
    end

    def movie_filter
      return self.where(program_type: "Movie")
    end

    def tv_show_filter
      return self.where(program_type: "TV Show")
    end

  end

end

# , has_query: "%#{filter_query}%"