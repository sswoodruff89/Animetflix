class CreateGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :genres do |t|
      t.string :name, null: false, unique: true
      t.timestamps
    end
    add_index :genres, :name
  end
end
