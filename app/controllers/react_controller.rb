class ReactController < ApplicationController
  def home # return react root app
    render "pages/react_app"
  end
end
