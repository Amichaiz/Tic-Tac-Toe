
let player
let comp
let gameover=false
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let divs = document.getElementsByClassName("box")
let igor = document.getElementById("igor")
igor.addEventListener("click", playerigor);
let ziv = document.getElementById("ziv")
ziv.addEventListener("click", playerziv);

function playerigor() {
    player = "igor"
    comp = "ziv"
    ziv.removeEventListener("click", playerziv)
    igor.removeEventListener("click", playerigor)
    listener()
}
function playerziv() {
    player = "ziv"
    comp = "igor"
    ziv.removeEventListener("click", playerziv)
    igor.removeEventListener("click", playerigor)
    listener()
}
function listener() {
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", game)
    }
}
function game() {
    this.removeEventListener("click", game)
    arr.splice(arr.indexOf(parseInt(this.id)), 1)
    this.classList.add(player)
    win(player)
    computerturn()
}
function computerturn() {
    if (!gameover){
    let guess = Math.floor(Math.random() * 9)
    while (!arr.includes(guess)) {
        guess = Math.floor(Math.random() * 9)
        if (arr.length == 0) {
            break
        }
    }
    if (arr.length != 0) {
        arr.splice(arr.indexOf(guess), 1)
        divs[guess].classList.add(comp)
        divs[guess].removeEventListener("click", game)
        win(comp)
    }
    else {
        alert("Tie Game Over")
        newgame()
    }
}
}
function win(winner) {
    if (
        (divs[0].classList.contains(winner) && divs[1].classList.contains(winner) && divs[2].classList.contains(winner)) ||
        (divs[3].classList.contains(winner) && divs[4].classList.contains(winner) && divs[5].classList.contains(winner)) ||
        (divs[6].classList.contains(winner) && divs[7].classList.contains(winner) && divs[8].classList.contains(winner)) ||

        (divs[0].classList.contains(winner) && divs[3].classList.contains(winner) && divs[6].classList.contains(winner)) ||
        (divs[1].classList.contains(winner) && divs[4].classList.contains(winner) && divs[7].classList.contains(winner)) ||
        (divs[2].classList.contains(winner) && divs[5].classList.contains(winner) && divs[8].classList.contains(winner)) ||

        (divs[0].classList.contains(winner) && divs[4].classList.contains(winner) && divs[8].classList.contains(winner)) ||
        (divs[6].classList.contains(winner) && divs[4].classList.contains(winner) && divs[2].classList.contains(winner))) {
        alert("The Winner is " + winner)
        for (let i = 0; i < divs.length; i++) {
            divs[i].removeEventListener("click", game)
        }
        gameover = true
        newgame()
    }
}
function newgame(){
    let loose = document.createElement("button")
    loose.setAttribute("class", "button");
    loose.innerHTML = "Play Again"
    document.getElementById("container").appendChild(loose)
    loose.addEventListener("click", start)
}
function start() {
  document.getElementsByTagName("button")[0].remove()
  gameover = false
  player = null
  comp = null
  arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  arr.forEach(e=>{
      divs[e].classList.remove("igor")
      divs[e].classList.remove("ziv")
    })
  ziv.addEventListener("click", playerziv);
  igor.addEventListener("click", playerigor);
}
