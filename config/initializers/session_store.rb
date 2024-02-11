if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_public_internet", domain: "http://cyril26-public-internet.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_public_internet"
end
