# == Schema Information
#
# Table name: profiles
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#

class Profile < ApplicationRecord
    validates :name, presence: true

    has_many :watchlists,
        class_name: "Watchlist",
        foreign_key: :profile_id,
        dependent: :destroy

    has_many :watched_programs,
        through: :watchlists,
        source: :program

    belongs_to :user

    has_many :likes,
        class_name: "Like",
        dependent: :destroy
    
    has_many :liked_programs,
        through: :likes,
        source: :program

    has_many :liked_genres,
        through: :likes,
        source: :liked_genres




    def genre_like_totals
        self.liked_genres.group(:name).order(count: :desc).count
    end
end



