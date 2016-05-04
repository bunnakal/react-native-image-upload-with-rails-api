class CreatePropertyImages < ActiveRecord::Migration
  def change
    create_table :property_images do |t|
      t.string :image
      t.string :description
      t.references :property, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
