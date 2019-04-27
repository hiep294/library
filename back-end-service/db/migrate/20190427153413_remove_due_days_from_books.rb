class RemoveDueDaysFromBooks < ActiveRecord::Migration[5.2]
  def change
    remove_column :books, :due_days, :integer
  end
end
