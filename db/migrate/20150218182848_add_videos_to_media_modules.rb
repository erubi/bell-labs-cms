class AddVideosToMediaModules < ActiveRecord::Migration
  def change
    add_column :media_modules, :videos, :json
  end
end
