class Album {
    constructor(id, name, artist, genre, imgURL, songs){
        this.id = id
        this.name = name
        this.artist = artist
        this.genre = genre
        this.imgURL = imgURL
        this.songs = []
        songs.forEach(song => this.songs.push(song))
    }   

    makeCard = (parentElement) => {
        let html = `
        <div class="album-card" data-alb-id="${this.id}">
            <span class="alb-name">${this.name} | ${this.genre}</span>
            <div class="img-container">
            <img src="${this.imgURL}">
            </div>
            <span class="alb-artist">${this.artist}</span>
            <button class="delete" data-del-id="${this.id}">Delete</button>
        </div> `
        parentElement.innerHTML += html
        // debugger
        let songsDiv = document.createElement('div')
        songsDiv.setAttribute('class', 'tracklist-container')
        for (let i = 0; i < this.songs.length; i++) {
            songsDiv.innerHTML += `
            <div class="song-container">
            <div class="song-title">${i + 1}. ${this.songs[i].title} <div>${this.songs[i].runtime}</div></div>
            </div>
            `
        }
        document.querySelector(`[data-alb-id='${this.id}']`).appendChild(songsDiv)
        // debugger
    }

    // delete = (div) => {
    //     let configObject = {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({id: this.id})
    //     }
    //     fetch(`http://localhost:3000/albums/${this.id}`, configObject)
    //     .then(res => res.json())
    //     div.remove()
    // }

}