class RemoveCountdownBeginColumn < ActiveRecord::Migration
  def change
    remove_column :events, :countdown_begin
  end
end
