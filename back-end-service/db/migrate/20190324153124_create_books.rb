class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :authors
      t.string :tags
      t.integer :available_quantity, default: 0
      t.boolean :is_text_book
      t.string :book_image
      t.text :review

      t.timestamps
    end
  end
end
