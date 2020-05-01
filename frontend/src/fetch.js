class Fetch {
    constructor() {
        this.url = 'http://localhost:3000'
        this.albumPath = `${this.url}/albums`
        this.loginPath = `${this.url}/login`
        this.albums = []
        this.headerObj = {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }

    getAlbums = function(){
        return fetch(this.albumPath)
        .then(r => r.json())
        // .then(j => this.storeAlbums(j))
        // .catch(e => console.log(e))
    }

    returnAlbums = (albums) => {
        debugger
    }
    

    static albums() {

    }

    static destroy(url) {

    }
}


