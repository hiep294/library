class CreateTicketDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :ticket_details do |t|
      t.references :ticket, foreign_key: true
      t.references :book, foreign_key: true
      t.datetime :due_date
      t.datetime :return_date

      t.timestamps
    end
  end
end
