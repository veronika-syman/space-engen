'use strict';

/*******************
 * 
 *   ЗАПУСК ИГРЫ
 */

let background,
    scores,
    scoresText,
    cursorPointer,
    player,
    compass,
    arrow,
    weapon,
    playerBulletsArr = [],
    asteroidsArr = [],
    explosionsArr = [],
    enemiesArr = [];
    

    
function startGame() {
    scores = 0;
    background = new Background();
    scoresText = new Text(`SCORES: ${scores}`, 10, 10,  180, 24, 24, '#00ff00', 'left');
    cursorPointer = new CursorPointer();
    player = new Player();
    compass = new Compass();
    arrow = new Arrow();
    weapon = new Weapon()
    asteroidsArr.push( new Asteroid(), new Asteroid(), new Asteroid() );
    enemiesArr.push( new Enemy(1) );

}

/******************
 * 
 *  ИГРОВОЙ ЦИКЛ
 */

let previousTimeStamp;
function animation(timeStamp) {
    // обновляем временные метки
    const dt = timeStamp - previousTimeStamp;
    previousTimeStamp = timeStamp;

    // обнавляем canvas
    ctx.clearRect(0, 0, vw, vh);

    background.update(dt);

    cursorPointer.update(dt);
    
    playerBulletsArr.forEach( bullet => bullet.update(dt) );
    playerBulletsArr = getExistsObjectsFromArr( playerBulletsArr );
    
    player.update(dt);

    compass.update(dt);
    arrow.update(dt);

    weapon.update(dt);

    asteroidsArr.forEach( asteroid => asteroid.update(dt) );
    asteroidsArr = getExistsObjectsFromArr( asteroidsArr );
    if (asteroidsArr.length < 3) asteroidsArr.push( new Asteroid() );

    explosionsArr.forEach( explosion => explosion.update(dt) );
    explosionsArr = getExistsObjectsFromArr( explosionsArr );

    enemiesArr.forEach( enemy => enemy.update(dt) );
    enemiesArr = getExistsObjectsFromArr( enemiesArr );

    scoresText.draw();
 
    // запускаем занова анимацию
    if (isOnFocus) requestAnimationFrame( animation );
}