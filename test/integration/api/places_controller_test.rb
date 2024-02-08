require "test_helper"

module Api
  class PlacesControllerTest < ActionDispatch::IntegrationTest
    test "answers places the match search term is empty" do
      place = FactoryBot.create(:place)
      get "/api/places?search_term="
      parsed_body = JSON.parse(response.body)
      expected_response = (
        {
          places: [
            {
              name: place.name,
              city: place.city,
              most_recent_download_speed: nil,
              most_recent_download_speed_units: nil,
              number_of_measurements: 0
            }.stringify_keys
          ]
        }.stringify_keys
      )
      assert_equal expected_response, parsed_body
    end

    test "answers all places if search term is set" do
      place1 = FactoryBot.create(:place, name: "Vodafone Cafe")
      place2 = FactoryBot.create(:place, name: "Coke Stand")
      binding.break
      get "/api/places?search_term=stand"
      parsed_body = JSON.parse(response.body)
      expected_response = (
        {
          places: [
            {
              name: place2.name,
              city: place2.city,
              most_recent_download_speed: nil,
              most_recent_download_speed_units: nil,
              number_of_measurements: 0
            }.stringify_keys
          ]
        }.stringify_keys
      )
      assert_equal expected_response, parsed_body
    end

    test "answers no places if search term dows not match any places" do
      FactoryBot.create(:place, name: "Vodafone Cafe")

      get "/api/places?search_term=adsff"

      parsed_body = JSON.parse(response.body)
      expected_response = { places: [] }.stringify_keys

      assert_equal expected_response, parsed_body
    end

    test "recent upload speed, units, and number of measurements are correct" do
      place = FactoryBot.create(:place, name: "Vodafone Cafe", city: "Kumasi")
      speed1 = FactoryBot.create(
        :internet_speed,
        place: place,
        download_speed: 23.42,
        download_units: "mbps",
        created_at: 4.days.ago
      )

      speed2 = FactoryBot.create(
        :internet_speed,
        place: place,
        download_speed: 3.49,
        download_units: "mbps",
        created_at: 2.days.ago
      )

      get "/api/places?search_term"

      parsed_body = JSON.parse(response.body)
      expected_response = (
        {
          places: [
            {
              name: "Vodafone Cafe",
              city: "Kumasi",
              most_recent_download_speed: 23.42,
              most_recent_download_speed_units: "mbps",
              number_of_measurements: 2
            }.stringify_keys
          ]
        }.stringify_keys
      )
    end
  end
end
