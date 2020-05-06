class SessionsController < ApplicationController
    # include CurrentUserConcern

    def new
        user = User.create!(user_params)
        if user
            session[:user_id] = user.id
            binding.pry
            render json: user, except: [:password_digest]
        else
            render json: { 
                status: 500,
                errors: "Somethin' ain't right"
             }
        end
    end

    def logged_in
        binding.pry
        if current_user
            render json: {
                logged_in: true,
                user: current_user
            }
        else
            render json: { logged_in: false }
        end
    end

    def create

    end

    def logout
        binding.pry
        session.clear :user_id
        render json: { status: 200 }
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
end