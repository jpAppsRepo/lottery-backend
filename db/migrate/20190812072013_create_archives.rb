class CreateArchives < ActiveRecord::Migration[5.2]
  def change
    create_table :archives do |t|
      t.string :attachment
      t.timestamps
    end
  end
end
