class RemoveDescFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :name
    rename_column :events, :description, :event_text
  end
end
