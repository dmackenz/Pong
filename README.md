# Pong
##### Dylan MacKenzie

This is a remake of the game Pong written in JavaScript using the p5.js framework.

> [w, s] control player 1 <br>
> [upArrow, downArrow] control player 2

This game adapts to any viewport size and scales appropriately. Looking to port over to use touch controls for mobile soon.

https://dmackenz.github.io/Pong/

# Engine
##### Main Loop
```JavaScript
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
```
##### Collision Detection
```JavaScript
    // bounce on edges
    if (this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1;
    }

    // bounce on paddle 1
    if ((this.pos.x >= p1.pos.x - allowance && this.pos.x <= p1.pos.x + allowance) &&
        this.pos.y <= p1.pos.y + p1.pheight &&
        this.pos.y >= p1.pos.y - p1.pheight) {
        this.vel.x *= -1;
        return false;

    // bounce on paddle 2
    } else if ((this.pos.x >= p2.pos.x - allowance && this.pos.x <= p2.pos.x + allowance) &&
                this.pos.y <= p2.pos.y + p2.pheight &&
                this.pos.y >= p2.pos.y - p2.pheight) {
        this.vel.x *= -1;
        return false;
    }

    // player 2 wins
    else if (this.pos.x < p1.pos.x) {
        // tally
        p2.points++;

        // restart
        return true;

    // player 1 wins
    } else if (this.pos.x > p2.pos.x) {
        // tally
        p1.points++;

        // restart
        return true;
    }
```
