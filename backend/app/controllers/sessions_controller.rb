class SessionsController < ApplicationController
<<<<<<< HEAD
    include CurrentUserConcern

    def new
        binding.pry
        user = User.create!(user_params)

        if user
            session[:user_id] = user.id
            render json: { 
                status: :created, 
                user: user 
            }
        else
            render json: { status: 500 }
        end
    end

    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: { logged_in: false }
        end
    end

    def create

    end

    def logout
        reset_session
        render json: { status: 200 }
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
=======
    # include CurrentUserConcern

    # def new
    #     binding.pry
    #     user = User.create!(user_params)

    #     if user
    #         session[:user_id] = user.id
    #         render json: { 
    #             status: :created, 
    #             user: user 
    #         }
    #     else
    #         render json: { status: 500 }
    #     end
    # end

    # def logged_in
    #     if @current_user
    #         render json: {
    #             logged_in: true,
    #             user: @current_user
    #         }
    #     else
    #         render json: { logged_in: false }
    #     end
    # end

    # def create

    # end

    # def logout
    #     reset_session
    #     render json: { status: 200 }
    # end

    # private

    # def user_params
    #     params.require(:user).permit(:username, :password)
    # end
>>>>>>> 5ebc1b4b8731670b9afcef1ac152584e268bc9c0
end