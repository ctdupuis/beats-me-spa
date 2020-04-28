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

    }

    getAlbums = () => {
        fetch(this.baseURL)
        .then(res => res.json())
        .then(json => json.forEach(album => {
            let alb = new Album(album.name, album.artist, album.genre, album.img_url)
            alb.songs.forEach(song => alb.storeSong(song))
        }))
    }

    renderAlbums = (album) => {
        let html = `<span class="alb-name">${album.name}</span>
        <div class="img-container">
            <img src="${album.img_url}">
        </div>
        <span class="alb-artist">${album.artist.name}</span>
        `
        let divCard = document.createElement('div')
        divCard.setAttribute('data-album-id', album.id)
        divCard.setAttribute('class', 'album-card')
        divCard.innerHTML += html
        this.flexContainer.appendChild(divCard)
    }

    start = () => {
        this.renderAlbums(this.albums)
    }
}

