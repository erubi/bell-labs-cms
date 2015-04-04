class RemoveEventTextFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :event_text
  end
end
