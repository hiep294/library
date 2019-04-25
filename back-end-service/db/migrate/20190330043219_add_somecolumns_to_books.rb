class AddSomecolumnsToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :call_number, :string
    add_column :books, :publisher, :string
    add_column :books, :year_of_publication, :integer
  end
end
