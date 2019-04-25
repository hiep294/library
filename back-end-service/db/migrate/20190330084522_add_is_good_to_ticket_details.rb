class AddIsGoodToTicketDetails < ActiveRecord::Migration[5.2]
  def change
    add_column :ticket_details, :is_good, :boolean, default: true
  end
end
