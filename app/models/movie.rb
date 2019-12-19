# == Schema Information
#
# Table name: movies
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  yr          :integer          not null
#  description :text             not null
#  rating      :string           not null
#  runtime     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  director    :string           not null
#  score       :float            not null
#

class Movie < ApplicationRecord

  include MovieFilter

  RATINGS = [
    "G",
    "PG",
    "PG-13",
    "R",
    "NC-17",
    "TV-Y",
    "TV-Y7",
    "TV-G",
    "TV-PG",
    "TV-14",
    "TV-MA",
    "NR"
  ]

  validates :title, :yr, :description, :runtime, :director, :score, presence: true
  validates :score, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  validates :rating, inclusion: { in: RATINGS }

  has_many :genre_links,
    class_name: "GenreLink",
    foreign_key: :movie_id

  has_many :genres,
    through: :genre_links

  has_many :watchlists,
    foreign_key: :movie_id,
    dependent: :destroy
  
  has_many :users_watching,
    through: :watchlists,
    source: :user

  def is_watched_by_user?(user)
    return self.users_watching_ids.include?(user.id)
  end

  def get_runtime
    hr = (self.runtime / 60) > 0 ? (self.runtime / 60).to_s + "h" : ""
    min = (self.runtime % 60) > 0 ? (self.runtime % 60).to_s + "m" : ""
    
    return "#{hr} #{min}"
  end

  def list_genres
    self.genres.map {|genre| genre.name}
  end

  has_one_attached :thumbnail
  has_one_attached :background
  has_one_attached :logo

  has_one_attached :clip

end
