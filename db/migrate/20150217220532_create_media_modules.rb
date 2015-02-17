class CreateMediaModules < ActiveRecord::Migration
  def change
    create_table :media_modules do |t|
      t.string :name
      t.float :active_interval
      t.float :active_time
      t.boolean :active

      t.timestamps null: false
    end
  end
end
