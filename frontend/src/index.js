const BASE_PATH = 'http://localhost:3000'
const ALBUMS_PATH = `${BASE_PATH}/albums`

document.querySelector('form#new-album').addEventListener("submit", function(e){
    debugger
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