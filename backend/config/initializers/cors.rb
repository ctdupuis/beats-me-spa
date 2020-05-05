# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
<<<<<<< HEAD
    origins "localhost:8000"
=======
    origins "localhost:8000", "file:///Users/codydupuis/Development/code/beats-me-spa/frontend/index.html"
>>>>>>> 5ebc1b4b8731670b9afcef1ac152584e268bc9c0

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
  end
end

Rails.application.config.action_controller.forgery_protection_origin_check = false
