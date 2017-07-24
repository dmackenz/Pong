// paddles
var p1, p2;

// ball
var ball;

// paddle speed
var pspeed;

// friction coefficient
var friction;

// ball speed
var ballSpeed;

function setup() {
    // initialize window
    createCanvas(windowWidth, windowHeight);

    // global friction magnitude
    friction = 1;

    // drawing mode and styling
    rectMode(CENTER);
    fill(255);
    noStroke();
    textSize(32);

    // create paddles
    p1 = new Paddle(width / 100, height / 2);
    p2 = new Paddle(width - width / 100, height / 2);

    // speed that paddles move at
    pspeed = 10;

    // create ball
    ball = new Ball(width / 2, height / 2);

    // speed that ball moves at
    ballSpeed = 5;

    // generate initial ball motion
    ball.start(ballSpeed);
}

function keyPressed(e) {
    switch (e.key) {
        // move p2 up
        case "ArrowUp":
            p2.applyForce(createVector(0, -pspeed));
            break;
        // move p2 down
        case "ArrowDown":
            p2.applyForce(createVector(0, pspeed));
            break;
        // move p1 up
        case 'w':
            p1.applyForce(createVector(0, -pspeed));
            break;
        // move p1 down
        case 's':
            p1.applyForce(createVector(0, pspeed));
            break;
        default:
            break;
    }
}

function draw() {
    // clear background
    background(51);

    // paddle 1 engine
    p1.show();
    p1.update();
    p1.edges();
    p1.showpoints(width / 4, height / 4);

    // paddle 2 engine
    p2.show();
    p2.update();
    p2.edges();
    p2.showpoints(width * (3 / 4), height / 4);

    // ball engine
    ball.show();
    ball.update();
    if (ball.edges(p1, p2)) {
        ball.start(ballSpeed);
    }

    // global friction
    applyFriction();
}

function applyFriction() {
    // apply friction if paddle 1 is moving
    switch (p1.direction()) {
        case 0:
            p1.applyForce(createVector(0, friction));
            break;
        case 1:
            p1.applyForce(createVector(0, -friction));
            break;
        default:
            break;
    }

    // apply friction if paddle 2 is moving
    switch (p2.direction()) {
        case 0:
            p2.applyForce(createVector(0, friction));
            break;
        case 1:
            p2.applyForce(createVector(0, -friction));
            break;
        default:
            break;
    }
}