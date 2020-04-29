ALBUMS_PATH = 'http://localhost:3000/albums'
GENRES_PATH = 'http://localhost:3000/genres'

const albForm = document.querySelector('form#new-album')
// const singleBtn = document.querySelector('button#single')
// const epBtn = document.querySelector('button#EP')
// const lpBtn = document.querySelector('button#LP')
const buttons = document.querySelectorAll('button.button')

function generateFields(num, parent) {
    parent.innerHTML += `
    <label for="track${num}-title">Track ${num} Title</label>
    <input class="track-input" type="text" name="track${num}-title">
    <label for="track${num}-runtime">Track ${num} Runtime</label>
    <input class="track-input" type="text" name="track${num}-runtime">
    `
}
buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
    const [single, ep, lp] = buttons
    albForm.style.display = ""
    const input = document.querySelector('input#track-input')
    if (e.target === ep) {
        // generate 5 fields
        ep.style.display = "none"
        lp.style.display = ""
        single.style.display = ""
        for (let i = 2; i <= 5; i++) {
            generateFields(i, albForm)
            // <label for='track1-title'>Track 1 Title</label>
            // <input type='text' name='track1-title' value="BAD NEWS"></input>
        }
    } else if (e.target === lp) {
        // generate 16 fields
        lp.style.display = "none"
        ep.style.display = ""
        single.style.display = ""
        for (let i = 2; i <= 16; i++) {
            generateFields(i, albForm)
            // <label for='track1-title'>Track 1 Title</label>
            // <input type='text' name='track1-title' value="BAD NEWS"></input>
        }
    } else {
        // just do one field
        single.style.display = "none"
        lp.style.display = ""
        ep.style.display = ""
    };
    albForm.innerHTML += "<input type='submit' value='Add Album'>"
    }
    )
})



albForm.addEventListener("submit", function(e){
    debugger
    let albumdata = {
        album: { 
            name: e.target.children["album-name"].value,
            artist_name: e.target.children["artist-name"].value,
            genre_id: e.target.children['genre_id'].value,
            img_url: e.target.children['album-img'].value,
            songs_attributes: [
                {
                    title: e.target.children["track1-title"].value,
                    runtime: e.target.children["track1-runtime"].value
                }
            ]
        }
    }
    let object = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(albumdata)
    }
    fetch(ALBUMS_PATH, object)
    .then(res => res.json())
    .then(json => {
        renderAlbum(json)
        renderSongs(json)
    })
    e.preventDefault();
})

fetch(ALBUMS_PATH)
.then(res => res.json())
.then(json => json.forEach(album => {
    renderAlbum(album)
    renderSongs(album)
    // debugger
}))

fetch (GENRES_PATH)
.then(res => res.json())
.then(json => json.forEach(genre => renderGenre(genre)))

function renderAlbum(album){
    // debugger
    let flexContainer = document.querySelector('div.flex-container')
    let divCard = document.createElement('div')
    divCard.setAttribute('data-album-id', album.id)
    divCard.setAttribute('class', 'album-card')
    let html = `
    <span class="alb-name">${album.name}</span>
    <div class="img-container">
        <img src="${album.img_url}">
    </div>
    <span class="alb-artist">${album.artist.name}</span>
    `
    divCard.innerHTML += html
    flexContainer.appendChild(divCard)
}

function renderSongs(album){
    let songsDiv = document.createElement('div')
    songsDiv.setAttribute('class', 'tracklist-container')
    let divCard = document.querySelector(`[data-album-id='${album.id}']`)
    divCard.appendChild(songsDiv)
    for (let i = 0; i < album.songs.length; i++){
        songsDiv.innerHTML += `
        <div class="song-container">
        <div class="song-title">${i + 1}.  ${album.songs[i].title} <div> ${album.songs[i].runtime}</div></div>
        </div>
        `
        // debugger
    }
}

function renderGenre(genre){
    let genSelect = document.querySelector('select#genre_id')
    let html = `
    <option value="${genre.id}">${genre.name}</option>
    `
    genSelect.innerHTML += html
}