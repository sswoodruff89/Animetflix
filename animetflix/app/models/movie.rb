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
#

class Movie < ApplicationRecord
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

  validates :title, :yr, :description, :runtime, :director, presence: true
  validates :rating, inclusion: { in: RATINGS }

  has_many :genre_links,
    class_name: "GenreLink",
    foreign_key: :movie_id

  has_many :genres,
    through: :genre_links

end
