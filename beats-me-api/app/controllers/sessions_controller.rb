class SessionsController < ApplicationController

    def new
        user = User.create!(user_params)
        # binding.pry
        if user
            token = issue_token({jwt: user.id})
            render json: { jwt: token, user: user.username }
        else
            render json: { 
                status: 500,
                errors: user.errors
             }
        end
    end

    def create
        user = User.find_by(username: params[:user][:username])
        # binding.pry
        if user && user.authenticate(params[:user][:password])
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