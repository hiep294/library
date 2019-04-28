class AddFeeToTicketDetails < ActiveRecord::Migration[5.2]
  def change
    add_column :ticket_details, :fee, :integer, default: 0
  end
end
