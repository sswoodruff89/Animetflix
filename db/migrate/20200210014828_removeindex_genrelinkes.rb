class RemoveindexGenrelinkes < ActiveRecord::Migration[5.2]
  def change
    remove_index :genre_links, name: :index_genre_links_on_program_id
  end
end
