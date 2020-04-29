class App {
    constructor(baseURL){
        this.baseURL = baseURL
        this.albums = []
        this.genres = []
        this.albumsURL = `${baseURL}/albums`
        this.genresURL = `${baseURL}/genres`
        this.newAlbumForm = document.querySelector('form#new-album')
        this.headerObj = {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
        this.flexContainer = document.querySelector('div.flex-container')
        this.formBtns = document.querySelectorAll('button.form-btn')

    }

    static flexContainer = document.querySelector('div.flex-container')
    static albumsURL = `${this.baseUrl}/albums`
    static albums = []

    generateFields = (num, parent) => {
        parent.innerHTML += `
        <label for="track${num}-title">Track ${num} Title</label>
        <input class="track-input" type="text" name="track${num}-title" value="track${num}">
        <label for="track${num}-runtime">Track ${num} Runtime</label>
        <input class="track-input" type="text" name="track${num}-runtime" value="${num}:00">
        `
    }

    bindListeners = () => {
        let url = this.albumsURL
        this.formBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const [si, ep, lp] = this.formBtns
                this.newAlbumForm.style.display = ""
                if (e.target === ep) {
                    ep.style.display = "none"
                    lp.style.display = ""
                    si.style.display = ""
                    for (let i = 2; i <= 5; i++) {
                        this.generateFields(i, this.newAlbumForm)
                    }
                } else if (e.target === lp) {
                    lp.style.display = "none"
                    ep.style.display = ""
                    for (let i = 2; i <= 16; i++) {
                        this.generateFields(i, this.newAlbumForm)
                    }
                } else {
                    si.style.display = "none"
                    lp.style.display = ""
                    ep.style.display = ""
                }
                this.newAlbumForm.innerHTML += "<input action='/albums' type='submit' value='Add Album'>"
            })
        });
        // let submit = document.getElementById('new-alb')
        this.newAlbumForm.addEventListener("submit", function(e){
           
            debugger
            let albumdata = {
                album: { 
                    name: e.target.children["album-name"].value,
                    artist_name: e.target.children["artist-name"].value,
                    genre_id: e.target.children['genre_id'].value,
                    img_url: e.target.children['album-img'].value
                }
            }
            let songs = Array.from(e.target.children).filter(child => {
                // debugger
                return child.className === 'track-input'
            })
            albumdata.album.songs_attributes = [] 
            for (let x = 0, y = 1; x < songs.length; x+2, y+2) {
                let song = Object.assign({}, {title: songs[x].value, runtime: songs[y].value})
                albumdata.album.songs_attributes.push(song)
                // if (songs[i].name === `track${i}-title`) {
                //     albumdata.album.songs_attributes.push({title: songs[i].value})
                // } else {
                //     // let obj = {}
                //     // obj.runtime = songs[i].value
                //     let x = (i-1)
                //     let target = albumdata.album.songs_attributes[x]
                //     let runtime = Object.assign({}, {runtime: songs[i].value})
                //     debugger
                //     Object.assign(target, runtime)
                }
            debugger
            let object = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(albumdata)
            }
            debugger
            fetch(url, object)
            .then(res => res.json())
            .then(album => {
                debugger
                let alb = new Album(album.id, album.name, album.artist.name, album.genre.name, album.img_url, album.songs)
                App.albums.push(alb)
                App.renderAlbum(alb)
                App.renderSongs(alb)
            })
            e.preventDefault();
        })
    }


    getAlbums = () => {
        // debugger
        fetch(this.albumsURL)
        .then(res => res.json())
        .then(json =>  {
            json.forEach(album => {
                let alb = new Album(album.id, album.name, album.artist.name, album.genre.name, album.img_url, album.songs)
                App.albums.push(alb)
            })
            App.albums.forEach(album => {
                App.renderAlbum(album)
                App.renderSongs(album)
            })
        }
        )
        .catch(err => alert(err))
    }

    getGenres = () => {
        fetch(this.genresURL)
        .then(res => res.json())
        .then(json => json.forEach(genre => {
            let newGen = new Genre(genre.id, genre.name);
            this.genres.push(newGen);
            this.applyGenre(newGen)
        }))
    }

    applyGenre = (genre) => {
        // debugger
        let genSelect = document.getElementById('genre_id')
        let html = `<option value="${genre.id}">${genre.name}</option>`
        genSelect.innerHTML += html
    }

    static renderAlbum = (album) => {
        let html = `<span class="alb-name">${album.name} | ${album.genre}</span>
        <div class="img-container">
            <img src="${album.imgURL}">
        </div>
        <span class="alb-artist">${album.artist}</span>
            `
        let divCard = document.createElement('div')
        divCard.setAttribute('data-album-id', album.id)
        divCard.setAttribute('class', 'album-card')
        divCard.innerHTML += html
        // debugger
        App.flexContainer.appendChild(divCard)
    }

    static renderSongs = (album) => {
        let songsDiv = document.createElement('div')
        songsDiv.setAttribute('class', 'tracklist-container')
        let divCard = document.querySelector(`[data-album-id='${album.id}']`)
        divCard.appendChild(songsDiv)
        for (let i = 0; i < album.songs.length; i++) {
            songsDiv.innerHTML += `
            <div class="song-container">
            <div class="song-title">${i + 1}. ${album.songs[i].title} <div>${album.songs[i].runtime}</div></div>
            </div>
            `
        }
    }
}

