class Album {
    constructor(name, artist, genre, imgURL){
        this.name = name
        this.artist = artist
        this.genre = genre
        this.imgURL = imgURL
        this.songs = []
    }

    storeSong = (song) => {
        this.songs.push(song)
    }
}