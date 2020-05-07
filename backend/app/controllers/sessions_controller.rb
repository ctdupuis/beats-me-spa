class SessionsController < ApplicationController
    # include CurrentUserConcern


    def new
        user = User.create!(user_params)
        if user
            token = issue_token({jwt: user.id})
            binding.pry
            render json: { jwt: token, user: user.username }
        else
            render json: { 
                status: 500,
                errors: "Somethin' ain't right"
             }
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            token = issue_token({jwt: user.id})
            render json: { jwt: token, user: user.username}
        else
            render json: {
                status: 500,
                errors: "Invalid username/password combination. Please try again"
            }
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end

end