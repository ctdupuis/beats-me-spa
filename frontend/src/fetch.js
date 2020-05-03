class Fetch {
    constructor(url, event) {
        this.url = url
        this.configObject = {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"  
            }
        }
        this.event = event
    }

    get = function() {
        return fetch(this.url)
        .then(r => r.json())
    }

    setupAlbObj = (event) => {
        let data = {
            album: { 
                name: event.target.children["album-name"].value,
                artist_name: event.target.children["artist-name"].value,
                genre_name: event.target.children['genre'].value,
                img_url: event.target.children['album-img'].value,
                songs_attributes: []
            }
        }
        // form an array of input fields
        let songs = Array.from(event.target.children).filter(child => {
            return child.className === 'track-input'
        })
        // loop to format the field values for submission
        let x = 0
        while (songs[x] !== undefined) {
            let songObj = Object.assign({}, {title: songs[x].value, runtime: songs[x+1].value});
            if (songObj.title === "" && songObj.runtime === "") {
                break;
            } else {
            data.album.songs_attributes.push(songObj)
            x += 2
            }
        }
        return data
    }

    post = function() {
        let albumdata = this.setupAlbObj(this.event)
        this.configObject.method = "POST"
        this.configObject.body = JSON.stringify(albumdata)
        // this.configObject.credentials = "include"
        return fetch(this.url, this.configObject)
        .then(r => r.json())
    }
    

    delete = function() {
        this.configObject.method = "DELETE"
        return fetch(`${this.url}/${this.event.target.dataset.delId}`, this.configObject)
        .then(r => r.json())
    }

    signup = function(event) {

    }

    login = function(event) {

    }

    logout = function(event) {

    }
}


