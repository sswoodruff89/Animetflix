class RemoveColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :profiles, :user_id
    add_column :profiles, :user_id, :integer, null: false
  end
end
