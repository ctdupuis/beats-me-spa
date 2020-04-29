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
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url)
            // debugger
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
        debugger
        let albumdata = {
            album: { 
                name: event.target.children["album-name"].value,
                artist_name: event.target.children["artist-name"].value,
                genre_name: event.target.children['genre'].value,
                img_url: event.target.children['album-img'].value,
                songs_attributes: []
            }
        }
        debugger
        let songs = Array.from(event.target.children).filter(child => {
            return child.className === 'track-input'
        })
        let x = 0
        while (songs[x] !== undefined) {
            let song = Object.assign({}, {title: songs[x].value, runtime: songs[x+1].value});
            albumdata.album.songs_attributes.push(song)
            x += 2
        }
        // debugger
        let object = {
            method: 'POST',
            headers: this.headerObj,
            body: JSON.stringify(albumdata)
        }
        fetch(this.albumsURL, object)
        .then(res => res.json())
        .then(alb => {
            debugger
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url)
            album.makeCard(this.flexContainer)    
        })
        event.preventDefault();
    }

}

    // bindListeners = () => {
    //     let url = this.albumsURL
    //     this.formBtns.forEach(btn => {
    //         btn.addEventListener("click", (e) => {
    //             const [si, ep, lp] = this.formBtns
    //             this.newAlbumForm.style.display = ""
    //             if (e.target === ep) {
    //                 ep.style.display = "none"
    //                 lp.style.display = ""
    //                 si.style.display = ""
    //                 for (let i = 2; i <= 5; i++) {
    //                     this.generateFields(i, this.newAlbumForm)
    //                 }
    //             } else if (e.target === lp) {
    //                 lp.style.display = "none"
    //                 ep.style.display = ""
    //                 for (let i = 2; i <= 16; i++) {
    //                     this.generateFields(i, this.newAlbumForm)
    //                 }
    //             } else {
    //                 si.style.display = "none"
    //                 lp.style.display = ""
    //                 ep.style.display = ""
    //             }
    //             this.newAlbumForm.innerHTML += "<input action='/albums' type='submit' value='Add Album'>"
    //         })
    //     });
    //     // let submit = document.getElementById('new-alb')
    //     this.newAlbumForm.addEventListener("submit", function(e){
    //         let albumdata = {
    //             album: { 
    //                 name: e.target.children["album-name"].value,
    //                 artist_name: e.target.children["artist-name"].value,
    //                 genre_id: e.target.children['genre_id'].value,
    //                 img_url: e.target.children['album-img'].value,
    //                 songs_attributes: []
    //             }
    //         }
    //         let songs = Array.from(e.target.children).filter(child => {
    //             return child.className === 'track-input'
    //         })
    //         for (let x = 0, y = 1; x < songs.length; x+2, y+2) {
    //             let song = Object.assign({}, {title: songs[x].value, runtime: songs[y].value})
    //             albumdata.album.songs_attributes.push(song)
    //             }
    //         debugger
    //         let object = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'accept': 'application/json'
    //             },
    //             body: JSON.stringify(albumdata)
    //         }
    //         debugger
    //         fetch(url, object)
    //         .then(res => res.json())
    //         .then(album => {
    //             // debugger
    //             let alb = new Album(album.id, album.name, album.artist.name, album.genre.name, album.img_url, album.songs)
    //             App.albums.push(alb)
    //             App.renderAlbum(alb)
    //             App.renderSongs(alb)
    //         })
    //         e.preventDefault();
    //     })
    // }


    // getAlbums = () => {
    //     // debugger
    //     fetch(this.albumsURL)
    //     .then(res => res.json())
    //     .then(json =>  {
    //         json.forEach(album => {
    //             let alb = new Album(album.id, album.name, album.artist.name, album.genre.name, album.img_url, album.songs)
    //             App.albums.push(alb)
    //         })
    //         App.albums.forEach(album => {
    //             App.renderAlbum(album)
    //             App.renderSongs(album)
    //         })
    //     }
    //     )
    //     .catch(err => alert(err))
    // }

    // getGenres = () => {
    //     fetch(this.genresURL)
    //     .then(res => res.json())
    //     .then(json => json.forEach(genre => {
    //         let newGen = new Genre(genre.id, genre.name);
    //         this.genres.push(newGen);
    //         this.applyGenre(newGen)
    //     }))
    // }

    // applyGenre = (genre) => {
    //     // debugger
    //     let genSelect = document.getElementById('genre_id')
    //     let html = `<option value="${genre.id}">${genre.name}</option>`
    //     genSelect.innerHTML += html
    // }

    // renderAlbum = (album) => {
    //     let html = `<span class="alb-name">${album.name} | ${album.genre}</span>
    //     <div class="img-container">
    //         <img src="${album.imgURL}">
    //     </div>
    //     <span class="alb-artist">${album.artist}</span>
    //         `
    //     let divCard = document.createElement('div')
    //     divCard.setAttribute('data-album-id', album.id)
    //     divCard.setAttribute('class', 'album-card')
    //     divCard.innerHTML += html
    //     // debugger
    //     App.flexContainer.appendChild(divCard)
    // }

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


