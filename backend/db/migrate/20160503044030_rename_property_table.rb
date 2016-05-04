class RenamePropertyTable < ActiveRecord::Migration
  def change
    rename_table :properies, :properties
  end
end
