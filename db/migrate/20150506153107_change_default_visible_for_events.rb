class ChangeDefaultVisibleForEvents < ActiveRecord::Migration
  def change
    change_column_default :events, :visible, true
  end
end
