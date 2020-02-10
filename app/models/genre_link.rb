# == Schema Information
#
# Table name: genre_links
#
#  id         :bigint           not null, primary key
#  program_id :integer          not null
#  genre_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GenreLink < ApplicationRecord
  validates :program_id, :genre_id, presence: true

  belongs_to :program, 
    foreign_key: :program_id 
    
  belongs_to :genre, 
    foreign_key: :genre_id
    
end
