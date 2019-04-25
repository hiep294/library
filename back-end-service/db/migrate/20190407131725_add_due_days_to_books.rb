class AddDueDaysToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :due_days, :integer
  end
end
