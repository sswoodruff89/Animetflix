module MovieFilter
  extend ActiveSupport::Concern

  module ClassMethods
    def title_filter(filter_query)

      # results = self.where("lower(:filter) LIKE :query", filter: "#{filter}", query: "#{filter_query}%")
      # table_query = self.arel_table
      filter_query = filter_query.downcase

      results = self.where("translate(title, ':-;', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end

    def director_filter(filter_query)
      filter_query = filter_query.downcase
      results = self.where("translate(director, ':-;', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end

    #FOR GENRE
    def genre_filter(filter_query)
      filter_query = filter_query.downcase
      results = self.where("translate(name, ':-;', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end
    ##

    def all_filter(filter_query)

      # results = self.where("lower(:filter) LIKE :query", filter: "#{filter}", query: "#{filter_query}%")
      # table_query = self.arel_table
      filter_query = filter_query.downcase

      results = self.where("translate(title, ':-;', '') ILIKE :start_query 
        OR translate(director, ':-;', '') ILIKE :start_query", start_query: "#{filter_query}%")
    end

    def all_include_filter(filter_query)
      filter_query = filter_query.downcase

      results = self.where("translate(title, ':-;', '') ILIKE :start_query 
        OR translate(director, ':-;', '') ILIKE :start_query", start_query: "%#{filter_query}%")
    end

  end

end

# , has_query: "%#{filter_query}%"