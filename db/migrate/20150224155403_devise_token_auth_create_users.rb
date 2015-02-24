class DeviseTokenAuthCreateUsers < ActiveRecord::Migration
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string, default: ""
    add_column :users, :tokens, :text

    add_index :users, [:uid, :provider],     :unique => true
  end
end
