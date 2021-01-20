
let amiibos = undefined
    selectedAmiibos = []
//UI DOM elements
    listOfCards = document.querySelector('.itens')
    input = document.querySelector('input')

input.addEventListener("input", (e)=> {
    selectAmiibos(input.value.toLowerCase())
})

listOfCards.innerHTML = ""

getData()
async function getData() {
    let myObject = await fetch("https://amiiboapi.com/api/amiibo/")
    amiibos = await myObject.json()
    amiibos = await amiibos.amiibo
}


function selectAmiibos(text){
    listOfCards.innerHTML = ""
    selectedAmiibos = []
    text.toLowerCase

    amiibos.forEach(amiibo =>{
        let containsText = 0

        amiibo.amiiboSeries.toLowerCase().includes(text) ? containsText++ :{}
        amiibo.character.toLowerCase().includes(text) ? containsText++ :{}
        amiibo.gameSeries.toLowerCase().includes(text) ? containsText++ :{}
        amiibo.type.toLowerCase().includes(text) ? containsText++ :{}
        
        if(typeof amiibo.release.au  === 'string'){
        amiibo.release.au.toLowerCase().includes(text) ? containsText++ :{}
        }
        if(typeof amiibo.release.eu  === 'string'){
            amiibo.release.eu.toLowerCase().includes(text) ? containsText++ :{}
        }
        if(typeof amiibo.release.jp  === 'string'){
            amiibo.release.jp.toLowerCase().includes(text) ? containsText++ :{}
        }
        if(typeof amiibo.release.na  === 'string'){
            amiibo.release.na.toLowerCase().includes(text) ? containsText++ :{}
        }

        if (containsText > 0){
            selectedAmiibos.push(amiibo)
        }
    })

    selectedAmiibos.forEach(amiibo => {
        createCard(
            amiibo.name,
            amiibo.image ,
            amiibo.amiiboSeries ,
            amiibo.gameSeries ,
            amiibo.type ,
            amiibo.release.au ,
            amiibo.release.jp ,
            amiibo.release.eu ,
            amiibo.release.na ,)
    })

    addEventListener()

}

//Add event listener to list to click to expand/minimize card
function addEventListener(){
    const clickToExpMin = document.querySelectorAll(".click-to-change")

    clickToExpMin.forEach(element=> {
        element.addEventListener('click', ()=>
            element.parentElement.parentElement.classList.toggle('active')
        )
    })
}

function createCard(name, img, amiiboSeries, gameSeries, type, ausRelease, japRelease, eurRelease, norRelease){

    const card = document.createElement("li")
    let year = ""
    card.classList.add('card')

    if (typeof japRelease === 'string') {
        year = `${japRelease[0]}${japRelease[1]}${japRelease[2]}${japRelease[3]}`
    }
    
    card.innerHTML = `
    <div class="top-box">
    <span class="title">${name} - ${year}</span> 
    <div class="click-to-change"><img src="/img/trace.svg" alt=""><img src="/img/trace.svg" alt=""></div> </div>
    <div class="content-wrapper">
        <div class="content">
            <img src="${img}" alt="">
            <div class="info amiibo-series">${amiiboSeries}</div>
            <div class="info game-series">${gameSeries}</div>
            <div class="info type">${type}</div>
            <div class="info release-date">
                <ul>
                    <li class="australia">${ausRelease}</li>
                    <li class="japan">${japRelease}</li>
                    <li class="europe">${eurRelease}</li>
                    <li class="north-america">${norRelease}</li>
                </ul>
            </div>
        </div>
    </div>`

    listOfCards.appendChild(card)
}


//createCard("Mario","https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png","Super Smash Bros.", "Super Mario", "Figure", "2014-11-29" , "2014-12-06","2014-11-28","2014-11-21")
