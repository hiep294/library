class CreateFees < ActiveRecord::Migration[5.2]
  def change
    create_table :fees do |t|
      t.string :type_of_book
      t.integer :fee_per_day

      t.timestamps
    end
  end
end
