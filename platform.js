export class Platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.type = type;
    this.broken = false;

    //animation break
    this.breakProgress = 0;
    if (this.type === "moving") {
      this.speedX = random(1.5, 3) * (random() < 0.5 ? -1 : 1);
    }
  }

  update() {
    if (this.broken) {
      this.breakProgress += 0.08;
      if (this.breakProgress > 1) this.breakProgress = 1;
      this.y += 5;
      return;
    }
    if (this.x <= 0 || this.x + this.w >= width) {
      this.speedX *= -1;
    }
  }

  draw() {
    // draw platform
    if (!this.broken) {
      push();
      if (this.type === "breakable") {
        fill(160, 82, 45); // breakable platform
      } else {
        fill(46, 125, 50); // normal platform
      }
      noStroke();
      rect(this.x, this.y, this.w, this.h, 4);
      pop();
      return;
    }

    // break platform
    const t = this.breakProgress;
    const gap = 4 + t * 12;
    const angle = t * 0.4;

    const halfW = this.w / 2;

    // left
    push();
    translate(this.x + halfW / 2 - gap, this.y);
    rotate(-angle);
    fill(160, 82, 45);
    noStroke();
    rect(-halfW / 2, 0, halfW, this.h, 4);
    pop();

    // right
    push();
    translate(this.x + halfW + halfW / 2 + gap, this.y);
    rotate(angle);
    fill(160, 82, 45);
    noStroke();
    rect(-halfW / 2, 0, halfW, this.h, 4);
    pop();
  }
}
