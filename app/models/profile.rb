class Profile < ApplicationRecord
    validates :name, presence: true

    has_many :watchlists,
        class_name: "Watchlist",
        foreign_key: :profile_id,
        dependent: :destroy

    has_many :watched_movies,
        through: :watchlists,
        source: :movie

    belongs_to :user
end



