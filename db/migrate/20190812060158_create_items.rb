class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.date :purchase_date
      t.string :phone_number
      t.string :surname
      t.string :name
      t.string :product_name
      t.integer :price_info
      t.string :phone_imei
      t.string :attachment
      t.timestamps
    end
  end
end
