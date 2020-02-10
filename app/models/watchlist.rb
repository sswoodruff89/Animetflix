# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint           not null, primary key
#  program_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  profile_id :integer          not null
#

class Watchlist < ApplicationRecord

  belongs_to :profile

  belongs_to :program
  
  has_many :watched_genres,
    through: :program,
    source: :genres

  
end
