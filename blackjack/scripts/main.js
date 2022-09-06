import {cards,pointCalcutation  } from "./card.js";


/* cards copy list for changes */
let cardsCopy = cards
/* Buttons and result */
let hitButton   =   document.querySelector('#hit')
let stayButton  =   document.querySelector('#stay')
let result      =   document.querySelector('#results')
/* dealer and player div */
let dealerDiv   =   document.querySelector('.dealer-cards')
let playerDiv   =   document.querySelector('.player-cards')
/* dealer and player score span */
let dealerScoreSpan = document.querySelector('#dealer-sum')
let playerScoreSpan = document.querySelector('#player-sum')
/* delete item from cardCopy array */
function deleteCard(index) {
    //index will be deleted card index
    cardsCopy.splice(index, 1); // 2nd parameter means remove one item only
}
/*  */
let playerScore = 0
let dealerScore = 0
let hitCounter  = 0
/* */
let hiddenCardName = ""
let hiddenCardPoint = 0

/* stay button function */
function showHiddenCard() {
    let hiddenCardImage = document.querySelector('#hiddenCard')
    hiddenCardImage.src = './card_images/'+hiddenCardName
    changeScore(dealerScoreSpan,hiddenCardPoint)
}
/* stay button function */
function addCardForDealar() {
    while (dealerScore<16) {
        let card        =   createRandomIndexCards()
        const cardImage =   document.createElement('img');
        cardImage.src   =   './card_images/'+card
        dealerDiv.appendChild(cardImage)
        deleteCard(cardsCopy.indexOf(card))
        changeScore(dealerScoreSpan,pointCalcutation(card))
    }
}
/* stay button function */
function checkWinner(params) {
    if(dealerScore <=21 && dealerScore>playerScore){
        result.innerHTML = "You Lose"
    }
    else if(dealerScore >21 ){
        result.innerHTML = "You Won"
    }   
    else if(dealerScore === playerScore){
        result.innerHTML = "Deal"
    }
    else{
        result.innerHTML = "You Won"
    }
}

/* ------------------------------------------------- */
function changeScore(span,score) {
    if(span === dealerScoreSpan){
        dealerScore+= score
        span.innerHTML = dealerScore
    }
    else{
        playerScore+= score
        span.innerHTML = playerScore
    }
}

function createRandomIndexCards() {
    let index           =   Math.floor(Math.random() * cardsCopy.length);
    let cardName        =   cardsCopy[index]
    return cardName
}
function playerFirstCards(){
    for (let index = 0; index < 2; index++) {
        let card       =   createRandomIndexCards()
        const cardImage =   document.createElement('img');
        cardImage.src= './card_images/'+card
        playerDiv.appendChild(cardImage)
        deleteCard(cardsCopy.indexOf(card))
        changeScore(playerScoreSpan,pointCalcutation(card))
    }
}
function dealerFirstCards() {
    for (let index = 0; index < 2; index++) {
        if(index == 0){
            let card        =   createRandomIndexCards()
            const cardImage =   document.createElement('img');
            cardImage.setAttribute('id', 'hiddenCard');
            cardImage.src   =   './background_and_hidden_card/back.jpg'
            dealerDiv.appendChild(cardImage)
            deleteCard(cardsCopy.indexOf(card))
            hiddenCardName = card
            hiddenCardPoint = pointCalcutation(card)
        }
        else{
            let card        =   createRandomIndexCards()
            const cardImage =   document.createElement('img');
            cardImage.src   =   './card_images/'+card
            dealerDiv.appendChild(cardImage)
            deleteCard(cardsCopy.indexOf(card))
            changeScore(dealerScoreSpan,pointCalcutation(card))
        }
    }
 }
 /* for hit button */
function addCard() {
   

    let cardForPlayer     =   createRandomIndexCards()
    const playerCardImage =   document.createElement('img');
    playerCardImage.src   =   './card_images/'+cardForPlayer
    playerDiv.appendChild(playerCardImage)
    deleteCard(cardsCopy.indexOf(cardForPlayer))
    changeScore(playerScoreSpan,pointCalcutation(cardForPlayer))

    if(playerScore>21){
        result.innerHTML = "You Lose"
    }
    
}

dealerFirstCards()
playerFirstCards()

hitButton.addEventListener('click',addCard)
stayButton.addEventListener('click',() =>{
    showHiddenCard()
    addCardForDealar()
    checkWinner()
})

