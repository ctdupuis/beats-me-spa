class Session {
    constructor(){ 
        this.constructor.id = JSON.parse(localStorage.auth).jwt;
        this.constructor.current_user = JSON.parse(localStorage.auth).user;
    }

    static get token(){
        return this.id;
    }

    static get user(){
        return this.current_user;
    }

    static get clear(){
        localStorage.clear();
    }
}