class AddStartAndEndTimesToEvents < ActiveRecord::Migration
  def change
    rename_column :events, :datetime, :start_time
    add_column :events, :end_time, :datetime
  end
end
