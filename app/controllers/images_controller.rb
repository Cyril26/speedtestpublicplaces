class ImagesController < ApplicationController
  def show
    send_file Rails.root.join('app', 'assets', 'images', params[:filename]), type: 'image/jpg', disposition: 'inline'
  end
end
