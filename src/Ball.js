function Ball(x, y) {
    // ball height
    this.bheight = 10;

    // ball width
    this.bwidth = 10;

    // mechanics
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    
    // possible directions
    this.directions = [];
    this.directions.push(-1);
    this.directions.push(1);
}

/**
 * show
 *
 * display ball
 */
Ball.prototype.show = function() {
    ellipse(this.pos.x, this.pos.y, this.bwidth * 2, this.bheight * 2);
}

/**
 * applyForce
 *
 * apply a force to the ball
 */
Ball.prototype.applyForce = function(force) {
    this.acc.add(force);
}

/**
 * update
 *
 * per frame updating
 */
Ball.prototype.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

/**
 * edges
 *
 * bounce on horizontal edges and paddles and keep score
 * return 0 to continue
 * return 1 to restart
 */
Ball.prototype.edges = function(p1, p2) {
    // pixel allowance for collision detection
    var allowance = 2;

    // bounce on edges
    if (this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1;
    }

    // bounce on paddle 1
    if ((this.pos.x >= p1.pos.x - allowance && this.pos.x <= p1.pos.x + allowance) &&
        this.pos.y <= p1.pos.y + p1.pheight &&
        this.pos.y >= p1.pos.y - p1.pheight) {
        this.vel.x *= -1;
        return 0;

    // bounce on paddle 2
    } else if ((this.pos.x >= p2.pos.x - allowance && this.pos.x <= p2.pos.x + allowance) &&
                this.pos.y <= p2.pos.y + p2.pheight &&
                this.pos.y >= p2.pos.y - p2.pheight) {
        this.vel.x *= -1;
        return 0;
    }

    // player 2 wins
    else if (this.pos.x < p1.pos.x) {
        // tally
        p2.points++;

        // restart
        return 1;

    // player 1 wins
    } else if (this.pos.x > p2.pos.x) {
        // tally
        p1.points++;

        // restart
        return 1;
    }

    // resume
    return 0;
}

/**
 * start
 *
 * reposition the ball and start another round
 */
Ball.prototype.start = function(topSpeed) {
    // reset position
    this.pos.x = width / 2;
    this.pos.y = height / 2;
    this.vel.mult(0);
    this.acc.mult(0);

    // assign random x and y directions
    var x = this.getDirection();
    var y = this.getDirection();

    // variance in beginning ball speed
    var spread = 2;

    // create initial ball force
    var f = createVector(x * random(topSpeed - spread, topSpeed + spread), y * random(topSpeed - spread, topSpeed + spread));

    // move ball
    this.applyForce(f);
};

/**
 * getDirection
 *
 * return a random direction
 */
Ball.prototype.getDirection = function() {
    return this.directions[floor(random(this.directions.length))];
}