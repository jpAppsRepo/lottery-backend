class CreateLotteries < ActiveRecord::Migration[5.2]
  def change
    create_table :lotteries do |t|
      t.string :phone_number
      t.string :lottery_number

      t.timestamps
    end
  end
end
