'use strict';

/*****************
 * 
 *   ЗАГРУЗЧИК
 */

const loadingText = 'Loading'; // текст полосы загрузки
const startButtonText = 'START'; // текст кнопки после окончания загрузки

const SOUNDS_PATH = './src/sounds/'; // путь к звукам
const IMAGES_PATH = './src/images/'; // путь к изображениям
const SCRIPTS_PATH = './js/';        // путь к файлам JavaScript

// массив файлов звуков для загрузки (просто имя файла и формат)
const SOUNDS_UPLOAD_ARR = [
    'se_laser_shut_low.mp3',
    'se_explosion.mp3',
];

// массив файлов изображений для загрузки (просто имя файла и формат)
const IMAGES_UPLOAD_ARR = [
    'scrolling-dark-bg-2000x900px.png',
    'player_74x84px.png',
    'player_bullet_10x40px.png',
    'player_cursor_48x48px_16frames.png',
    'asteroid_128x128px_64frames.png',
    'explosion_big_400x400px_16frames.png',
    'explosion_small_200x200px_16frames.png',
    'compass_200x200px.png',
    'arrow_120x120px.png',
    'spaceship_fire_32x60px_16frames.png',
    'weapon_60x60px_3frames.png',
    'enemy2_112x112px.png',
];

// массив JavaScript файлов для загрузки
const SCRIPTS_UPLOAD_ARR = [
    'screen.js',
    'music.js',
    'control.js',
    'sprites.js',
    'functions.js',
    'objects.js',
    'main.js',
];
let scriptsToUpload = SCRIPTS_UPLOAD_ARR.length;

let uploadSize = SOUNDS_UPLOAD_ARR.length + IMAGES_UPLOAD_ARR.length;
let loadingStep = 100 / uploadSize;
let loadingProgress = 0;

const SE = {/* sound effects */};
function uploadSound(sound_name) {
    SE[sound_name] = new Audio();
    SE[sound_name].src = SOUNDS_PATH + sound_name;
    SE[sound_name].oncanplaythrough = (event) => {
        event.target.oncanplaythrough = null;
        updateLoadingProgress();
    };
}

const IMG = {/* game images */};
function uploadImage(image_name) {
    IMG[image_name] = new Image();
    IMG[image_name].src = IMAGES_PATH + image_name;
    IMG[image_name].onload = () => updateLoadingProgress();
}

function uploadScripts() {
    if (SCRIPTS_UPLOAD_ARR.length < 1) loadingDone();
    else {
        const script = document.createElement('script')
        script.src = SCRIPTS_PATH + SCRIPTS_UPLOAD_ARR.shift();
        script.onload = (event) => {
            console.log(event.target.src);
            uploadScripts();
        }
        document.body.append(script);
    }
}

function updateLoadingProgress() {
    uploadSize--;
    loadingProgress += loadingStep;
    loadingStatusDiv.innerHTML = `<b>${loadingText}</b> ${loadingProgress.toFixed()} <b>%</b>`;
    console.log('uploadSize', uploadSize);
    if (uploadSize < 1) uploadScripts();
}

IMAGES_UPLOAD_ARR.forEach( data => uploadImage(data) );
SOUNDS_UPLOAD_ARR.forEach( data => uploadSound(data) );

const loadingStatusDiv = document.createElement('div');
loadingStatusDiv.id = 'loadingStatusDiv';
loadingStatusDiv.innerHTML = `<b>${loadingText}</b> ${loadingProgress.toFixed()} <b>%</b>`;
document.body.prepend(loadingStatusDiv);

function loadingDone() {
    loadingStatusDiv.remove();

    const loadingReadyButton = document.createElement('button');
    loadingReadyButton.id = 'loadingReadyButton';
    loadingReadyButton.innerText = startButtonText;
    loadingReadyButton.onclick = () => {
        loadingReadyButton.remove();
        userPushStart();
    };
    document.body.prepend(loadingReadyButton);
}