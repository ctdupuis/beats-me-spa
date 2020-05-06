class ApplicationController < ActionController::API
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection
    # before_action :set_csrf_cookie
    # skip_before_action :verify_authenticity_token
    helper_method :current_user
    helper_method :user_is_authenticated

    protect_from_forgery with: :exception

    def current_user
        User.find_by(id: session[:user_id])
    end

    def user_is_authenticated
        !!current_user
    end

    private

    # def set_csrf_cookie
    #     cookies["CSRF_TOKEN"] = form_authenticity_token
    # end

end
