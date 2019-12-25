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
  include MovieFilter
  
  validates :name, presence: true

    has_many :genre_links

    has_many :movies, 
      through: :genre_links, 
      source: :movie

    has_many :likes,
      through: :movies,
      source: :likes
    
    def total_likes
      return self.likes.count
    end

    def total_likes_per_profile(profile_id)
      self.likes.where("profile_id == ?", profile_id)
    end
end
