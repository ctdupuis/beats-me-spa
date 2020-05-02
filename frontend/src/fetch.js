class Fetch {
    constructor(url, method=null, data=null) {
        this.url = url
        this.headerObj = {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
        this.method = method
        this.data = data
      }

    getAlbums = function() {
        return fetch(this.url)
        .then(r => r.json())
        // .then(j => this.storeAlbums(j))
        // .catch(e => console.log(e))
    }

    postAlbum = function() {
        return fetch(this.url, {
            method: this.method,
            headers: this.headerObj,
            body: JSON.stringify(this.data)
        })
        .then(r => r.json())
        debugger
    }
    

    static albums() {

    }

    static destroy(url) {

    }
}


