class App {
    constructor(baseURL){
        this.baseURL = baseURL
        this.albums = []
        this.albumsURL = `${baseURL}/albums`
        this.newAlbumForm = document.querySelector('form#new-album')
        this.newAlb = false
        this.flexContainer = document.querySelector('div.flex-container')
        this.formBtn = document.getElementById('form-btn')
        this.newAlbumForm.addEventListener("submit", this.postAlbum)
        this.formBtn.addEventListener("click", this.displayForm)
        this.headerObj = {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }

    renderAlbums = () => {
        fetch(this.albumsURL)
        .then(r => r.json())
        .then(json => json.forEach(alb => {
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
            debugger
            album.makeCard(this.flexContainer)
        }))
        .catch(err => alert(err))
    }

    displayForm = () => {
        this.newAlb = !this.newAlb
        if (this.newAlb){
            this.newAlbumForm.style.display = 'block'
        } else {
            this.newAlbumForm.style.dispay = 'none'
        }
    }

    // generateFields = (num, parent) => {
    //     parent.innerHTML += `
    //     <label for="track${num}-title">Track ${num} Title</label>
    //     <input class="track-input" type="text" name="track${num}-title" value="track${num}">
    //     <label for="track${num}-runtime">Track ${num} Runtime</label>
    //     <input class="track-input" type="text" name="track${num}-runtime" value="${num}:00">
    //     `
    // }

    postAlbum = (event) => {
        // debugger
        let albumdata = {
            album: { 
                name: event.target.children["album-name"].value,
                artist_name: event.target.children["artist-name"].value,
                genre_name: event.target.children['genre'].value,
                img_url: event.target.children['album-img'].value,
                songs_attributes: []
            }
        }
        let songs = Array.from(event.target.children).filter(child => {
            return child.className === 'track-input'
        })
        // debugger
        let x = 0
        while (songs[x] !== undefined) {
            let songObj = Object.assign({}, {title: songs[x].value, runtime: songs[x+1].value});
            debugger
            albumdata.album.songs_attributes.push(songObj)
            x += 2
        }
        debugger
        let object = {
            method: 'POST',
            headers: this.headerObj,
            body: JSON.stringify(albumdata)
        }
        fetch(this.albumsURL, object)
        .then(res => res.json())
        .then(alb => {
            debugger
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
            album.makeCard(this.flexContainer)    
        })
        event.preventDefault();
    }

}


    // static renderSongs = (album) => {
    //     let songsDiv = document.createElement('div')
    //     songsDiv.setAttribute('class', 'tracklist-container')
    //     let divCard = document.querySelector(`[data-album-id='${album.id}']`)
    //     divCard.appendChild(songsDiv)
    //     for (let i = 0; i < album.songs.length; i++) {
    //         songsDiv.innerHTML += `
    //         <div class="song-container">
    //         <div class="song-title">${i + 1}. ${album.songs[i].title} <div>${album.songs[i].runtime}</div></div>
    //         </div>
    //         `
    //     }
    // }


