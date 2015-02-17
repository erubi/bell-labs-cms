class AddImagesToMediaModule < ActiveRecord::Migration
  def change
    add_column :media_modules, :images, :json
  end
end
