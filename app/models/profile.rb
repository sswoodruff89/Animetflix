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

    has_many :watched_movies,
        through: :watchlists,
        source: :movie

    belongs_to :user
end



