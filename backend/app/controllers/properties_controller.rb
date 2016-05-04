class PropertiesController < ApplicationController
  def create
    puts 'its working...'
    @property = Property.new(property_params)
    if @property.save
      and params[:property_images].present?
      params[:property_images]['property_image'].each do |g|
        @property_images = @property.property_images.create!(:property_image => g,
         :property_id => @property.id)
      end
      render json: @property, status: :created, location: @property

    else
      puts 'errors'
      render json: @property.errors, status: :unprocessable_entity
    end
  end
  private
    def property_params
      # binding.pry
      puts 'its working in params...'
      params.require(:property).permit(:title, :description, :latitude,
        :longitude, property_images_attributes: [:id, :property_id, :property_image]
        )
      puts 'its working end params...'
    end
end
