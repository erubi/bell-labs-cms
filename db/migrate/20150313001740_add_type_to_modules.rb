class AddTypeToModules < ActiveRecord::Migration
  def change
    add_column :media_modules, :scene_type, :string
  end
end
