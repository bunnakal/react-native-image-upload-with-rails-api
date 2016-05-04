class PropertiesController < ApplicationController
  def create
    @property = Property.new(property_params)
    if @property.save
      render json: @property, status: :created, location: @property
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end
  private
    def property_params
      params.require(:property).permit(:title, :description, :latitude,
        :longitude, property_images_attributes: [:id, :image]
        )
    end
end