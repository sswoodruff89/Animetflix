class AddScoreColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :score, :float, null: false
  end
end
