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

require 'test_helper'

class GenreLinkTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
