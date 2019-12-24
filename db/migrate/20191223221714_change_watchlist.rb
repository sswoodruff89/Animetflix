class ChangeWatchlist < ActiveRecord::Migration[5.2]
  def change
    remove_column :watchlists, :user_id
    
  end
end
