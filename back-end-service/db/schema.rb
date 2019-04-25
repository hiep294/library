# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_07_131725) do

  create_table "books", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", null: false
    t.string "authors"
    t.string "tags"
    t.integer "available_quantity", default: 0
    t.boolean "is_text_book"
    t.string "book_image"
    t.text "review"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "location"
    t.string "call_number"
    t.string "publisher"
    t.integer "year_of_publication"
    t.integer "due_days"
  end

  create_table "due_days", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "type_of_book"
    t.integer "due_days"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ticket_details", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "ticket_id"
    t.bigint "book_id"
    t.datetime "due_date"
    t.datetime "return_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "note"
    t.boolean "is_good", default: true
    t.bigint "student_id"
    t.index ["book_id"], name: "index_ticket_details_on_book_id"
    t.index ["student_id"], name: "index_ticket_details_on_student_id"
    t.index ["ticket_id"], name: "index_ticket_details_on_ticket_id"
  end

  create_table "tickets", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_id"], name: "index_tickets_on_student_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "name"
    t.string "auth_token"
    t.boolean "is_admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "ticket_details", "books"
  add_foreign_key "ticket_details", "students"
  add_foreign_key "ticket_details", "tickets"
  add_foreign_key "tickets", "students"
end
