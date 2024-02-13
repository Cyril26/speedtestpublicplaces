allowed_origins = YAML.load_file("#{Rails.root}/config/cors.yml")['allowed_origins']

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins allowed_origins
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end
end
