const BASE_PATH = 'http://localhost:3000'
const ALBUMS_PATH = `${BASE_PATH}/albums`

document.querySelector('form#new-album').addEventListener("submit", function(e){
    // debugger
    let albumdata = {
        album: { 
            name: e.target.children["album-name"].value,
            artist_name: e.target.children["artist-name"].value,
            genre: e.target.children['genre'].value,
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
    .then(json => console.log(json))
    e.preventDefault();
})

fetch(ALBUMS_PATH)
.then(res => res.json())
.then(json => json.forEach(album => renderAlbum(album)))

function renderAlbum(album){
    // debugger
    let flexContainer = document.querySelector('div.flex-container')
    let divCard = document.createElement('div')
    divCard.setAttribute('data-album-id', album.id)
    divCard.setAttribute('class', 'album-card')
    let html = `
    <div class="img-container">
    <span class="alb-name">${album.name}</span>

        <img src="${album.img_url}">
    </div>
    `
    divCard.innerHTML += html
    flexContainer.appendChild(divCard)
}