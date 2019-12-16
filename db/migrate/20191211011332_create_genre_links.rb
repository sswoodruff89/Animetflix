class CreateGenreLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :genre_links do |t|
      t.integer :movie_id, null: false
      t.integer :genre_id, null: false

      t.timestamps
    end
    
    add_index :genre_links, :movie_id
    add_index :genre_links, :genre_id

  end
end
