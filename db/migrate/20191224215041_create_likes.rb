class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :profile_id, null: false
      t.integer :movie_id, null: false
      t.timestamps
    end
    add_index :likes, [:profile_id, :movie_id], unique: true
  end
end
