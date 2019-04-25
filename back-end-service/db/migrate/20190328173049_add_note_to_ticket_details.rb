class AddNoteToTicketDetails < ActiveRecord::Migration[5.2]
  def change
    add_column :ticket_details, :note, :string
  end
end
