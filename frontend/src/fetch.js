class Fetch {
    constructor(url) {
        this.url = url
      }

    getAlbums = function() {
        return fetch(this.url)
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


