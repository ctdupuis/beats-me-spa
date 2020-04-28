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

    generateFields = (num, parent) => {
        parent.innerHTML += `
        <label for="track${num}-title">Track ${num} Title</label>
        <input type="text" name="track${num}-title">
        <label for="track${num}-runtime">Track ${num} Runtime</label>
        <input type="text" name="track${num}-runtime">
        `
    }

    bindListeners = () => {
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
                this.newAlbumForm.innerHTML += "<input id='new-alb' type='submit' value='Add Album'>"
            })
        });
        let submit = document.getElementById('new-alb')
    }

    getAlbums = () => {
        // debugger
        fetch(this.albumsURL)
        .then(res => res.json())
        .then(json =>  {
            json.forEach(album => {
                let alb = new Album(album.id, album.name, album.artist.name, album.genre.name, album.img_url, album.songs)
                this.albums.push(alb)
            })
            this.albums.forEach(album => {
                this.renderAlbum(album)
                this.renderSongs(album)
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
        }))
    }

    applyGenres = () => {
        debugger
        let genSelect = document.getElementById('genre_id')
        debugger
        this.genres.forEach(genre => {
            debugger
            let html = `<option value="${genre.id}">${genre.name}</option>`
            genSelect.children.push(html)
        })
    }

    renderAlbum = (album) => {
        let html = `<span class="alb-name">${album.name}</span>
        <div class="img-container">
            <img src="${album.imgURL}">
        </div>
        <span class="alb-artist">${album.artist}</span>
            `
        let divCard = document.createElement('div')
        divCard.setAttribute('data-album-id', album.id)
        divCard.setAttribute('class', 'album-card')
        divCard.innerHTML += html
        this.flexContainer.appendChild(divCard)
    }

    renderSongs = (album) => {
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

