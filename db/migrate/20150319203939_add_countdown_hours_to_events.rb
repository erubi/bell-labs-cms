class AddCountdownHoursToEvents < ActiveRecord::Migration
  def change
    add_column :events, :countdown_hours, :integer
  end
end
