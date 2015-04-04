# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150404163634) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.datetime "display_start_time"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.datetime "event_end_time"
    t.integer  "countdown_hours"
    t.string   "header"
    t.string   "subheader"
    t.datetime "event_start_time"
    t.boolean  "visible",            default: false
  end

  create_table "media_items", force: :cascade do |t|
    t.string   "file_name"
    t.string   "file_type"
    t.datetime "date_uploaded"
    t.string   "scene_association"
    t.string   "bell_labs_people"
    t.string   "top_level_category"
    t.string   "keywords"
    t.string   "additional_metadata"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "media_module_id"
    t.string   "image"
    t.string   "video"
    t.string   "description"
  end

  create_table "media_modules", force: :cascade do |t|
    t.string   "name"
    t.boolean  "active"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.float    "weight",     default: 0.0, null: false
    t.string   "scene_type"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                  default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
