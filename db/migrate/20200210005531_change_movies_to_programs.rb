class ChangeMoviesToPrograms < ActiveRecord::Migration[5.2]
  def change
    remove_index :genre_links, name: :index_genre_links_on_movie_id_and_genre_id
    remove_index :genre_links, name: :index_genre_links_on_movie_id
    remove_index :likes, name: :index_likes_on_profile_id_and_movie_id
    remove_index :watchlists, name: :index_watchlists_on_profile_id_and_movie_id
    rename_column :likes, :movie_id, :program_id
    rename_column :watchlists, :movie_id, :program_id
    rename_column :genre_links, :movie_id, :program_id
    rename_table :movies, :programs
    
    add_column :programs, :program_type, :string, null: false
    add_column :programs, :production_company, :string
    # add_column :profiles, :image_src, :string
    add_index :likes, [:profile_id, :program_id], unique: true
    add_index :genre_links, [:genre_id, :program_id], unique: true
    add_index :watchlists, [:profile_id, :program_id], unique: true
    add_index :genre_links, [:program_id], unique: true
  end
end
