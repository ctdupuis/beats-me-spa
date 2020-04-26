const BASE_PATH = 'http://localhost:3000'
const ALBUMS_PATH = `${BASE_PATH}/albums`

fetch(ALBUMS_PATH)
.then(res => res.json())
.then(json => json.forEach(album => renderAlbum(album)))

function renderAlbum(album){
    debugger
    let flexContainer = document.querySelector('div.flex-container')
    let divCard = document.createElement('div')
    divCard.setAttribute('data-album-id', album.id)
    let html = `
    <div class="img-container">
        <img src="${album.img_url}">
    </div>
    `
    divCard.innerHTML += html
    flexContainer.appendChild(divCard)
}