class RenameAndRemoveMediaModulesColumns < ActiveRecord::Migration
  def change
    remove_column :media_modules, :active_interval
    remove_column :media_modules, :active_time
    add_column :media_modules, :weight, :float, default: 0.00, null: false
  end
end
