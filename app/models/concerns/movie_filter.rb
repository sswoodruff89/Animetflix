module MovieFilter
  extend ActiveSupport::Concern

  module ClassMethods
    def title_filter(filter_query)

      # results = self.where("lower(:filter) LIKE :query", filter: "#{filter}", query: "#{filter_query}%")
      # table_query = self.arel_table
      filter_query = filter_query.downcase

      results = self.where("lower(title) LIKE :start_query", start_query: "#{filter_query}%")
    end

    def director_filter(filter_query)
      filter_query = filter_query.downcase
      results = self.where("lower(director) LIKE :start_query", start_query: "#{filter_query}%")
    end

    def genre_filter(filter_query)
      filter_query = filter_query.downcase
      results = self.where("lower(name) LIKE :start_query", start_query: "#{filter_query}%")
    end

  end

end

# , has_query: "%#{filter_query}%"