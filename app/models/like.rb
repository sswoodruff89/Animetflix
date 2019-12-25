# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  profile_id :integer          not null
#  movie_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ApplicationRecord
    validates :profile_id, :movie_id, presence: true

    belongs_to :movie

    belongs_to :profile

    
end
