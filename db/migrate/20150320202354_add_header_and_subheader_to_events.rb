class AddHeaderAndSubheaderToEvents < ActiveRecord::Migration
  def change
    add_column :events, :header, :string
    add_column :events, :subheader, :string
  end
end
