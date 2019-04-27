class AddPriceToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :price, :integer, default: 0, null: false
  end
end
