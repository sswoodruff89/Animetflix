# == Schema Information
#
# Table name: genres
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Genre < ApplicationRecord
  include ProgramFilter
  
  validates :name, presence: true

    has_many :genre_links

    has_many :programs, 
      through: :genre_links, 
      source: :program

    has_many :likes,
      through: :programs,
      source: :likes

    has_many :dislikes,
      through: :programs,
      source: :dislikes

    has_many :watches,
      through: :programs,
      source: :watchlists

    
    
    def total_likes
      return self.likes.count
    end

    def total_dislikes
      return self.dislikes.count
    end

    def total_watches
      return self.watches.count
    end

    def viewer_points(likes, dislikes, watches)
      return (likes * 2) + watches - dislikes
    end

    def get_movies
      return self.programs.where(program_type: "Movie")
    end

    def get_tv_shows
      return self.programs.where(program_type: "TV Show")
    end

    def total_likes_per_profile(id)
      self.likes.where("profile_id = ?", id).count
    end
end
