class AddMediaModuleAssociationWithMediaItems < ActiveRecord::Migration
  def change
    add_column :media_items, :media_module_id, :integer
  end
end
