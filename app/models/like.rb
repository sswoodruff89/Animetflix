# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  profile_id :integer          not null
#  program_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ApplicationRecord
    validates :profile_id, :program_id, presence: true

    belongs_to :program

    belongs_to :profile

    has_many :liked_genres,
        through: :program,
        source: :genres
end
