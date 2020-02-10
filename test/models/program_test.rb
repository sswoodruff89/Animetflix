# == Schema Information
#
# Table name: programs
#
#  id                 :bigint           not null, primary key
#  title              :string           not null
#  yr                 :integer          not null
#  description        :text             not null
#  rating             :string           not null
#  runtime            :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  director           :string           not null
#  score              :float            not null
#  program_type       :string           not null
#  production_company :string
#

require 'test_helper'

class ProgramTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
