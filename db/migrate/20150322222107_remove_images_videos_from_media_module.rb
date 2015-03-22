class RemoveImagesVideosFromMediaModule < ActiveRecord::Migration
  def change
    remove_column :media_modules, :images
    remove_column :media_modules, :videos
  end
end
