class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.timestamps
    end
    
    add_column :watchlists, :profile_id, :integer, unique: true, null: false
    add_index :watchlists, [:profile_id, :movie_id], unique: true
    add_index :profiles, :user_id, unique: true
    add_index :profiles, :name, unique: true
  end
end
