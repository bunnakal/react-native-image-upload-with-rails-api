class Property < ActiveRecord::Base
  has_many :property_images
  accepts_nested_attributes_for :property_images
end
