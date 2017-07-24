function Paddle(x, y) {
    this.acc = createVector();
    this.vel = createVector();
    this.pos = createVector(x, y);
    this.pheight = height / 8;
    this.pwidth = width / 200;
    this.points = 0;
}

Paddle.prototype.show = function() {
    rect(this.pos.x, this.pos.y, this.pwidth * 2, this.pheight * 2);
};

Paddle.prototype.showpoints = function(x, y) {
    text(this.points, x, y);
};

Paddle.prototype.applyForce = function(force, isFriction) {
    if (isFriction && this.vel > 0) {
        this.acc.add(force);
    } else if (!isFriction) {
        this.acc.add(force);
    }
};

Paddle.prototype.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
};

Paddle.prototype.direction = function() {
    if (this.vel.y > 0) {
        return 1;
    } else if (this.vel.y < 0) {
        return 0;
    }
};

Paddle.prototype.edges = function() {
    if (this.pos.y - this.pheight < 0) {
        this.pos.y = this.pheight;
    } else if (this.pos.y > height - this.pheight) {
        this.pos.y = height - this.pheight;
    }
};