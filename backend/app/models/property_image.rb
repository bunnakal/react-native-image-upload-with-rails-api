class PropertyImage < ActiveRecord::Base
  mount_uploader :property_image, ImageUploader
  belongs_to :property
end
