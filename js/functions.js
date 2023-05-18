'use strict';

/**********************************************
 * 
 *   ФИЛЬТР СУЩЕСТВУЮЩИХ ОБЪЕКТОВ
 * (если isExist = true - остается)
 */

 function getExistsObjectsFromArr(arr) {
    const filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isExist) filteredArr.push(arr[i]);
    }
    return filteredArr;
}


/**********************************************
 * 
 *   ДВИЖЕНИЕ ЗА ОБЪЕКТОМ С ЗАДАННОЙ СКОРОСТЬЮ
 *   (у объектов обязательно наличие свойств X и Y)
 */

 function moveTo(object, target, speed) {

    let dx = target.x - object.x;
    let dy = target.y - object.y;
    let distance = Math.sqrt( dx*dx + dy*dy );
            
    if (distance <= speed) {
        object.x = cursorPosition.x;
        object.y = cursorPosition.y;
    } else {
        let flyRate = speed / distance;
        object.x += flyRate * dx;
        object.y += flyRate * dy;
    }
}

// 
const lightningColorsArr = ['#ffffff', '#00ffff', '#ffffff', '#ff00ff', '#ffffff', '#00ffff'];
let lightningColorsIndex = 0;
function drawLightning(pointA, pointB) {
    // set new lightning color
    lightningColorsIndex++;
    if ( lightningColorsIndex === lightningColorsArr.length ) lightningColorsIndex = 0;
    ctx.strokeStyle = lightningColorsArr[ lightningColorsIndex ];

    let point = pointA;
    let target= pointB;

    const getDistance = (x1, y1, x2, y2) => {
        let dy = x1 - x2, dx = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    let distance = getDistance(point.x, point.y, target.x, target.y);

    let xx = point.x;
    let yy = point.y;
    let stepsCount = Math.ceil(distance * Math.random() / 3);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xx, yy);
    for (let i = stepsCount; i > 1; i--) {
        let pathLength = getDistance(xx, yy, point.x, point.y);
        let offset = Math.sin(pathLength / distance * Math.PI) * 5;
        xx += (target.x - xx) / i + Math.random() * offset * 2 - offset;
        yy += (target.y - yy) / i + Math.random() * offset * 2 - offset;
        ctx.lineTo(xx, yy);
    }
    ctx.stroke();
}