class Add < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :director, :string, null: false
  end
end
