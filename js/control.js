'use strict';

/******************************************
 * 
 *  ОТСЛЕЖИВАНИЕ ПОЛОЖЕНИЯ КУРСОРА МЫШИ
 */

const cursorPosition = {
    x: Math.floor(innerWidth / 2), 
    y: Math.floor(innerHeight / 2)
};

document.onmousemove = (event) => {
    cursorPosition.x = event.pageX;
    cursorPosition.y = event.pageY;
};

/***********************************
 * 
 *  ОБРАБОТКА СОБЫТИЙ КЛАВИАТУРЫ
 */

const KEY = {
    up : false,
    down : false,
    left : false,
    right : false,

    space : false,
    q : false,
};
document.addEventListener('keydown', (event) => {
    switch(event.code) {
        case 'KeyA' : KEY.left = true; break;
        case 'KeyD' : KEY.right = true; break;
        case 'KeyW' : KEY.up = true; break;
        case 'KeyS' : KEY.down = true; break;
    
        case 'ArrowLeft' : KEY.left = true; break;
        case 'ArrowRight' : KEY.right = true; break;
        case 'ArrowUp' : KEY.up = true; break;
        case 'ArrowDown' : KEY.down = true; break;

        case 'Space' : KEY.space = true; break;
        case 'KeyQ' : KEY.q = true; break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.code) {
        case 'KeyA' : KEY.left = false; break;
        case 'KeyD' : KEY.right = false; break;
        case 'KeyW' : KEY.up = false; break;
        case 'KeyS' : KEY.down = false; break;
    
        case 'ArrowLeft' : KEY.left = false; break;
        case 'ArrowRight' : KEY.right = false; break;
        case 'ArrowUp' : KEY.up = false; break;
        case 'ArrowDown' : KEY.down = false; break;

        case 'Space' : KEY.space = false; break;
        case 'KeyQ' : KEY.q = false; break;
    }
    // можно просмотреть event.code для кнопок
    // и при необходимости выше дописать их обработку
    console.log('key code :', event.code);
});