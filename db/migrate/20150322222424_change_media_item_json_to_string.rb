class ChangeMediaItemJsonToString < ActiveRecord::Migration
  def change
    remove_column :media_items, :images
    remove_column :media_items, :videos
    add_column :media_items, :image, :string
    add_column :media_items, :video, :string
  end
end
