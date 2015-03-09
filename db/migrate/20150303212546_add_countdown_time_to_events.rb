class AddCountdownTimeToEvents < ActiveRecord::Migration
  def change
    add_column :events, :countdown_begin, :datetime
  end
end
