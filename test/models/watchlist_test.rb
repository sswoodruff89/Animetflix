# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint           not null, primary key
#  movie_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  profile_id :integer          not null
#

require 'test_helper'

class WatchlistTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
