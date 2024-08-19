import _ from 'underscore';
import {create_deck,pedirCarta,valorCarta} from './usecases'
//Patron Modulo
const miModulo = (()=>{
  'use strict'
  let deck =[];
  const tipos=['C','H','D','S'],
        especiales=['A','J','Q','K'];
  //Referencias del HTML
  let puntosJugadores = [];
  const small=document.querySelectorAll('small');
  const btnPedir= document.querySelector('#Pedir');
  const btnDetener= document.querySelector('#Detener');
  const btnNuevo = document.querySelector('#Nuevo');
  const divCartasJugadores = document.querySelectorAll('.divCartas');
  //Inicializar juego
  const inicilizarJuego=(numeroJugadores=2)=>{
      deck = create_deck(tipos, especiales);
      console.log(deck);
      puntosJugadores=[];
      for (let index = 0; index < numeroJugadores; index++) {
          puntosJugadores.push(0);
      }
      small[0].innerText=0;
      small[1].innerText=0;
      btnPedir.disabled = false;
      btnDetener.disabled = false;
      divCartasJugadores.forEach(item => item.innerHTML='');
  }
  //metodos
  //Acumulador de puntos de jugadores
  // turno 0: primer jugador
  const acumularPuntos=(carta, turno)=>{
      puntosJugadores[turno] = puntosJugadores[turno]+valorCarta(carta);
      small[turno].innerText=puntosJugadores[turno];
      return puntosJugadores[turno];
  }
  const crearCarta=(turno, cartaJugador)=>{
      const carta = document.createElement('img');
      carta.src=("assets/cartas/"+cartaJugador+".png");
      carta.classList.add('carta');
      divCartasJugadores[turno].append(carta);
  }
  //turno de la computadora
  const turnoComputadora = (puntajeJugador)=>{
    let puntosComputadora=0;
    do {
        const a = pedirCarta(deck);
        puntosComputadora=acumularPuntos(a, puntosJugadores.length-1);
        crearCarta(puntosJugadores.length-1,a);
    } while ((puntosComputadora<puntajeJugador) && (puntajeJugador<=21));
}
  
  //Eventos
  btnPedir.addEventListener('click',()=>{
      const cartaJugador = pedirCarta(deck);
      const puntosJugador = acumularPuntos(cartaJugador,0); 
      crearCarta(0,cartaJugador);
      
      if (puntosJugador>21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador);
          setTimeout(() => {
              alert('PERDISTE');
          }, 10);
      }
  });
  const ganador=(puntosJugador, puntosComputadora)=>{
      setTimeout(() => {
          if(puntosComputadora>21){
              alert('Ganaste');
          }else if (puntosComputadora==puntosJugador) {
              alert('Empate');
          }else if(puntosComputadora>puntosJugador){
              alert('Perdiste');
          }else{
              alert('Perdiste');
          }    
      }, 10);
  }
  btnDetener.addEventListener('click',()=>{
      btnPedir.disabled = true;
      turnoComputadora(puntosJugadores[0]);
      ganador(puntosJugadores[0],puntosJugadores[puntosJugadores.length-1]);
      btnDetener.disabled = true;
  });
  btnNuevo.addEventListener('click',()=>{
      inicilizarJuego();    
  });
  return {
      inicio: inicilizarJuego()
  };
 
})();