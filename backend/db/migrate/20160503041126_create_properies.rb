class CreateProperies < ActiveRecord::Migration
  def change
    create_table :properies do |t|
      t.string :title
      t.string :description
      t.string :latitude
      t.string :longitude

      t.timestamps null: false
    end
  end
end
