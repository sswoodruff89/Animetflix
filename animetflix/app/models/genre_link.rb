# == Schema Information
#
# Table name: genre_links
#
#  id         :bigint           not null, primary key
#  movie_id   :integer          not null
#  genre_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GenreLink < ApplicationRecord
end
