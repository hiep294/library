class CreateDueDays < ActiveRecord::Migration[5.2]
  def change
    create_table :due_days do |t|
      t.string :type_of_book
      t.integer :due_days

      t.timestamps
    end
  end
end
