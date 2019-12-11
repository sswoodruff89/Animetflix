class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.integer :yr, null: false
      t.text :description, null: false
      t.string :rating, null: false
      t.integer :runtime, null: false

      t.timestamps
    end
    
    add_index :movies, :title
    add_index :movies, :yr
    add_index :movies, :rating
  end
end
