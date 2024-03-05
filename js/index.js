const play = document.querySelector('.play')
const option = document.querySelector('.option')
const exit = document.querySelector('.exit')
const back = document.querySelector('.back')
const retry = document.querySelector('.retry')
const retornar = document.querySelector('.return')
const gameover = document.querySelector('.gameover')
const menuoptions = document.querySelector('.menu-options')
const menu = document.querySelector('.menu')
const titulo = document.querySelector('.titulo')
const principal = document.querySelector('.principal')
const nav = document.querySelector('.nav')
const pontuacao = document.querySelector('.pontuacao')
const pontosfinal = document.querySelector('.pontosfinal')
var position = 48;
let playing = 0;
let id = 0;
let pontos = 0;

play.addEventListener('click', () => {
     menu.classList.toggle('menu--click')
     titulo.classList.toggle('titulo--click')
     principal.classList.toggle('principal--click')
     playing = 1;
     jogando();
})
option.addEventListener('click', () => {
     menuoptions.classList.toggle('menu-options--click')
     menu.classList.toggle('menu--click')
})

back.addEventListener('click', () => {
     menuoptions.classList.toggle('menu-options--click')
     menu.classList.toggle('menu--click')
})

retornar.addEventListener('click', () =>{
     gameover.classList.toggle('gameover--click')
     menu.classList.toggle('menu--click')
     titulo.classList.toggle('titulo--click')
})

retry.addEventListener('click', () =>{
     gameover.classList.toggle('gameover--click')
     principal.classList.toggle('principal--click')
     playing = 1;
     jogando();
})

exit.addEventListener('click', () => {

})

document.addEventListener("keydown", function(event){
     if(event.key == "ArrowRight" || event.key == "d"){
          if(position < 90){
               position += 1;
               nav.style.left = position + "vw";}

     } else if(event.key == "ArrowLeft" || event.key == "a"){
          if(position > 0){
               position -= 1;
               nav.style.left = position + "vw";
          }   
     }
})


//const cord = new makeStruct('id, x, y');
function Cord(id, x, y) {
     this.id = id;
     this.x = x;
     this.y = y;
   };

const cords = [];


function criarInimigo(timerId){
     let num = Math.floor(Math.random()*88);
     let p = document.createElement("img");
     p.src = "/img/navinha.png";
     p.style.width = "10vw"
     p.style.position = "absolute";
     p.style.left =  num + "vw";
     p.style.margin = 0;
     //p.className = objeto;
     p.id = id;
     var c = new Cord( id, num, 0);
     cords.push(c)
     document.body.appendChild(p)

     id++;

     // criarr um monte de bagulho caindo

}


function deletar(id){
     let p = document.getElementById(id);
     p.remove();
     cords.shift();
     pontos++;
     pontuacao.textContent = `pontuação: ${pontos}`
}

function descer(){
     for(let i=0; i<cords.length; i++){
          let id = cords[i].id;
          cords[i].y+=4;
          let pos = cords[i].y;
          let p = document.getElementById(id);
          p.style.top = pos + "vh";
          if(pos > 80) deletar(id);
     }
}

function collision(timerId){
     let player = position;
     let n = cords.length;
     for(i = 0; i<cords.length ;i++){
          if(cords[i].x >= player-7 && cords[i].x <= player+7 && cords[i].y >= 75){
               clearInterval(timerId);
               gameover.classList.toggle('gameover--click');
               principal.classList.toggle('principal--click')
               while(n--){
                    let p = document.getElementById(cords[0].id);
                    p.remove();
                    cords.shift();
               }
               pontosfinal.textContent = 'Você fez ' + pontos +' pontos';
               pontos = 0;
               pontuacao.textContent = `pontuação: ${pontos}`
               id = 0;
               position = 48;
               nav.style.left = position+"vw";
               break;
          }
     }
}

function jogando(){
     let tempo = 0;
     let deno = 8;
     let timerId = setInterval(function timer(){
        tempo++;
        console.log(tempo);
        if(tempo > 400) deno = 4;
        if(tempo > 800) deno = 2;
        if(tempo > 1600) deno = 1;

        if(tempo % deno == 0) criarInimigo(timerId);
        
        descer();
        collision(timerId);
     }, 70)
}
