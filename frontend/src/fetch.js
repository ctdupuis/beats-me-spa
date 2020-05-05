class Fetch {
    constructor(url, event) {
        this.url = url
        this.configObject = {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                authenticity_token: document.cookie.split('=')[1]
            }
        }
        this.event = event
        debugger
    }

    get = async function() {
        const response = await fetch(this.url);
        const json = await response.json();
        return json
    }

    // static async get(url){
    //     const response = await fetch(url)
    //     const json = await response.json()
    //     debugger
    //     return json
    // }

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

    getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    

    delete = function() {
        this.configObject.method = "DELETE"
        debugger
        return fetch(`${this.url}/${this.event.target.dataset.delId}`, this.configObject)
        .then(r => r.json())
    }

    signup = function() {
        let userdata = this.setupUserObj(this.event)
        debugger
    }

    setupUserObj = (event) => {
        debugger
        let data = { user: {
            username: event.target.children['username'].value,
            password: event.target.children['password'].value
            }
        }
        return data
    }

    login = function(event) {

    }

    logout = function(event) {

    }
}

// let token = "CSRF_TOKEN=yWKGp4zqOIzE%2FU4aJ%2FkIq8JRWchLfemsCNm2gIJWOI5NEDPWg6tq8Itw6sXz6PGH4d6GEHEcXRMtZW0sL8pQaA%3D%3D"
console.log(document.cookie)