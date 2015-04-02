class AddDescriptionToMediaItems < ActiveRecord::Migration
  def change
    add_column :media_items, :description, :string
  end
end
