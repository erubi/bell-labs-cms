class CreateMediaItems < ActiveRecord::Migration
  def change
    create_table :media_items do |t|
      t.string :file_name
      t.string :file_type
      t.datetime :date_uploaded
      t.string :scene_association
      t.string :bell_labs_people
      t.string :top_level_category
      t.string :keywords
      t.string :additional_metadata
      t.json :images
      t.json :videos

      t.timestamps null: false
    end
  end
end
