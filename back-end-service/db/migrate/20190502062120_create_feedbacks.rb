class CreateFeedbacks < ActiveRecord::Migration[5.2]
  def change
    create_table :feedbacks do |t|
      t.string :name
      t.integer :meet_requirement
      t.integer :usability
      t.text :improvement_comment

      t.timestamps
    end
  end
end
