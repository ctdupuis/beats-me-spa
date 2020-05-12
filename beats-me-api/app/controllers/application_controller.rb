class ApplicationController < ActionController::API
  
    def issue_token(payload)
        JWT.encode(payload, "98uo23hrdf")
    end

    def decode(token)
        JWT.decode(token, "98uo23hrdf")
    end
    

    private

    def current_user(token)
        check = decode(token)[0]['jwt']
        User.find(check)
    end
end
