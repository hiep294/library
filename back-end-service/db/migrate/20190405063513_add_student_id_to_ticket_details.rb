class AddStudentIdToTicketDetails < ActiveRecord::Migration[5.2]
  def change
    add_reference :ticket_details, :student, foreign_key: true
  end
end
