class Album {
    constructor(id, name, artist, genre, imgURL){
        this.id = id
        this.name = name
        this.artist = artist
        this.genre = genre
        this.imgURL = imgURL
    }   

    makeCard = (element) => {
        let html = `
        <div class="album-card" data-alb-id="${this.id}">
            <span class="alb-name">${this.name} | ${this.genre}</span>
            <div class="img-container">
            <img src="${this.imgURL}">
            </div>
            <span class="alb-artist">${this.artist}</span>
        </div> `
        element.innerHTML += html
    }
}