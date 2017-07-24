function Paddle(x, y) {
    // mechanics
    this.acc = createVector();
    this.vel = createVector();
    this.pos = createVector(x, y);

    // paddle height
    this.pheight = height / 8;

    // paddle width
    this.pwidth = width / 200;
    
    // player points
    this.points = 0;
}

/**
 * show
 *
 * display the paddle
 */
Paddle.prototype.show = function() {
    rect(this.pos.x, this.pos.y, this.pwidth * 2, this.pheight * 2);
};

/**
 * showpoints
 *
 * display the point total
 */
Paddle.prototype.showpoints = function(x, y) {
    text(this.points, x, y);
};

/**
 * applyForce
 *
 * apply a force to the paddle
 */
Paddle.prototype.applyForce = function(force, isFriction) {
    if (isFriction && this.vel > 0) {
        this.acc.add(force);
    } else if (!isFriction) {
        this.acc.add(force);
    }
};

/**
 * update
 *
 * by frame update
 */
Paddle.prototype.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
};

/**
 * direction
 *
 * indicate direction that the paddle is moving
 */
Paddle.prototype.direction = function() {
    if (this.vel.y > 0) {
        return 1;
    } else if (this.vel.y < 0) {
        return 0;
    }
};

/**
 * edges
 *
 * prevent paddle from leaving screen
 */
Paddle.prototype.edges = function() {
    if (this.pos.y - this.pheight < 0) {
        this.pos.y = this.pheight;
    } else if (this.pos.y > height - this.pheight) {
        this.pos.y = height - this.pheight;
    }
};