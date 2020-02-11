class Dislike < ApplicationRecord
    validates :profile_id, :program_id, presence: true

    belongs_to :program

    belongs_to :profile

    has_many :disliked_genres,
        through: :program,
        source: :genres
end