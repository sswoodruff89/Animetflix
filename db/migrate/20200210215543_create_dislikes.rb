class CreateDislikes < ActiveRecord::Migration[5.2]
  def change
    create_table :dislikes do |t|
      t.integer :profile_id, null: false
      t.integer :program_id, null: false
      t.timestamps
    end
    add_index :dislikes, [:profile_id, :program_id], unique: true

    change_column_null :programs, :runtime, true
    add_column :programs, :seasons, :integer, null: true
    add_column :profiles, :profile_num, :integer, null: false
  end
end
