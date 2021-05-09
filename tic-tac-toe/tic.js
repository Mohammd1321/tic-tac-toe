'use strict';

let o_class = 'o';
let x_class = 'x';

const grid_blocks = document.querySelectorAll('.grid__block');
const grid = document.querySelector('.grid');
const winning_text = document.querySelector('.winning-message h1');
const displayMessage = document.querySelector('.winning-message');
const button = document.querySelector('button');
const winning_combo = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
let active;

window.addEventListener('DOMContentLoaded',function() {
  addHover();
})


grid_blocks.forEach(item => {
  item.addEventListener('click',turns,{once: true});
})

function turns(e) {
    let mainItem = e.currentTarget;
    let currentTarget = active ? o_class:x_class;
    implement(mainItem,currentTarget);
    if(checkForWin(currentTarget)) {
      gameEnd(false);
    } else if (tie()) {
      gameEnd(true);
    } else {
      active = !active;
      addHover();
    }
}

function implement(mainItem,currentTarget) {
  mainItem.classList.add(currentTarget);
}

function addHover() {
  grid.classList.remove(x_class);
  grid.classList.remove(o_class);
  if(active) {
    grid.classList.add(o_class);
  } else {
    grid.classList.add(x_class);
  }
}

function checkForWin(currentTarget) {
  return winning_combo.some(arr => {
    return arr.every(item => {
      return grid_blocks[item].classList.contains(currentTarget)
    })
  })
}

function gameEnd(draw) {
  if(draw) {
    winning_text.textContent = 'there was a draw';
  } else {
    winning_text.textContent = `${active ? 'o have won':'x have won'} the game`;
  }
  displayMessage.classList.add('show');
}

function tie() {
  return [...grid_blocks].every(item => {
    return item.classList.contains(x_class) || item.classList.contains(o_class);
  })
}


button.addEventListener('click',function() {
  grid_blocks.forEach(block => {
    block.classList.remove(x_class);
    block.classList.remove(o_class);
    block.removeEventListener('click',turns,{once: true});
    block.addEventListener('click',turns,{once: true});
  })
  winning_text.textContent = '';
  displayMessage.classList.remove('show');
})
