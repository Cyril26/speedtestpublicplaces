module Api
  class InternetSpeedsController < BaseController
    def create
      place = Place.create!(
        name: params[:place_name],
        city: params[:place_city],
        address: params[:place_address],
      )

      speed = InternetSpeed.create!(
        place: place,
        download_speed: params[:download_speed],
        download_units: params[:download_units],
      )

      render(json: { }, status: :created)
    end
  end
end
