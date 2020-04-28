class Album {
    constructor(name, artist, genre, imgURL, songs){
        this.name = name
        this.artist = artist
        this.genre = genre
        this.imgURL = imgURL
        this.songs = []
        songs.forEach(song => this.songs.push(song))
    }

   
}