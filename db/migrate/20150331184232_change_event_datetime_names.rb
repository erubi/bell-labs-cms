class ChangeEventDatetimeNames < ActiveRecord::Migration
  def change
    rename_column :events, :start_time, :display_start_time
    rename_column :events, :event_time, :event_start_time
    rename_column :events, :end_time, :event_end_time
  end
end
