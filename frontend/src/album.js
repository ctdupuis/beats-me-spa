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

   
}