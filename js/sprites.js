'use strict';

/********************** 
 * 
 *   КЛАССЫ СПРАЙТОВ
 */

class Text {
    constructor(text = '', x = 0, y = 0, w = 20, h = 10, size = 12, color = '#00ff00', align='center') {
        this.img = document.createElement('canvas');
        this.img.width = w;
        this.img.height = h;
        this.ctx = this.img.getContext('2d');
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size;
        this.color = color
        this.align = align;
        this.isExist = true;
        this.render();
    }

    render() {
        this.ctx.font = `${this.size}px PTSans, Arial, sans-serif`;
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = this.align;
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(this.text, 0, 0);
    }

    setText( text ) {
        this.text = text;
        this.ctx.clearRect(0, 0, this.img.width, this.img.height);
        this.render();
    }

    draw() {
        ctx.drawImage( this.img, this.x,  this.y);
    }
}

class Sprite {
    constructor(imageName, x, y, size = null) {
        this.img = IMG[imageName];
        this.x = x;
        this.y = y;
        this.w = this.img.width;
        this.h = this.img.height;
        this.hw = Math.floor(this.w / 2);
        this.hh = Math.floor(this.h / 2);
        this.size = size || Math.floor( (this.w + this.h) / 4 );
        this.isExist = true;
    }

    draw() {
        ctx.drawImage( this.img, this.x - this.hw,  this.y - this.hh );
    }

    isCollided(sprite) {
        let d = this.getDistance(sprite);
        return this.size + sprite.size > d;
    }

    getDistance(sprite) {
        let dx = this.x - sprite.x;
        let dy = this.y - sprite.y;
        return Math.sqrt( dx*dx + dy*dy );
    }
}

class RotatedSprite extends Sprite {
    constructor(imageName, x, y, size = null, startAngle = 0) {
        super(imageName, x, y, size);
        this.direction = startAngle;
    }

    turnTo( target, turnSpeed = null ) {
        if (turnSpeed === null) {
            this.direction = Math.atan2(target.y - this.y, target.x - this.x);
            return;
        }
    
        let pointDirection = Math.atan2(target.y - this.y, target.x - this.x);
        let angle = (pointDirection - this.direction) % _2PI;
    
        if (angle < -Math.PI) angle += _2PI;
        if (angle >  Math.PI) angle -= _2PI;
    
        if (angle >= 0 &&  angle > turnSpeed) this.direction += turnSpeed;
        if (angle <  0 && -angle > turnSpeed) this.direction -= turnSpeed;
    }

    draw() {
        ctx.setTransform(1, 0, 0, 1, this.x, this.y);
        ctx.rotate(this.direction);
        ctx.drawImage( this.img, -this.hw, -this.hh );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

class SpriteSheet extends Sprite {
    constructor(imageName, x, y, size, fw, fh, frames) {
        super(imageName, x, y, size);
        this.framesArr = this.getFramesArr(fw, fh, frames);
        this.frame = 0
        this.fw = fw;
        this.fh = fh;
        this.fhw = Math.floor(this.fw / 2);
        this.fhh = Math.floor(this.fh / 2);
        this.frames = frames;
    }

    getFramesArr(fw, fh, frames) {
        const framesArr = [];
        for( let yy = 0; yy < this.h; yy += fh) {
            for( let xx = 0; xx < this.w; xx += fw) {
                framesArr.push( {x: xx, y: yy} );
            }
        }
        framesArr.length = frames;
        return framesArr;
    }

    draw() {
        ctx.drawImage( this.img,
            this.framesArr[this.frame].x, this.framesArr[this.frame].y, this.fw, this.fh,
            this.x - this.fhw,  this.y - this.fhh, this.fw, this.fh
        );
    }
}

class AnimationSpriteSheet extends SpriteSheet {
    constructor(imageName, x, y, size, fw, fh, frames, fps = 60, isInfinity = true) {
        super(imageName, x, y, size, fw, fh, frames);
        this.nextFrameTime = Math.floor(1000 / fps);
        this.nextFrameTimeout = this.nextFrameTime
        this.isInfinity = isInfinity;
        this.isAnimationCompleted = false;
    }

    draw(dt) {
        if (this.isAnimationCompleted) return;

        this.nextFrameTimeout -= dt
        if (this.nextFrameTimeout < 0) {
            this.nextFrameTimeout += this.nextFrameTime;
            this.frame++;
            if (this.frame === this.frames) {
                if ( this.isInfinity ) this.frame = 0;
                else {
                    this.isAnimationCompleted = true;
                    return;
                }
            }
        }
        super.draw();
    }
}