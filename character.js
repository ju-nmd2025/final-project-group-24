// Doraemon Character class
export class Character {
  constructor(x, y, w, h, vy = 0, speed = 4) {
    // toạ độ RECT dùng cho game logic (va chạm, di chuyển)
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // physics
    this.vy = vy;
    this.speed = speed;
  }

  draw() {
    // Tâm Doraemon = tâm hình chữ nhật của nhân vật
    const x = this.x + this.w / 2;
    const y = this.y + this.h / 2;

    // scale Doraemon theo chiều cao rect: h = 40 -> size = 200 (như code cũ)
    const size = this.h * 1.5;

    stroke(0);
    strokeWeight(1);

    // Head
    push();
    fill(0, 150, 255);
    ellipse(x, y, size, size);
    pop();

    // white out
    push();
    beginShape();
    vertex(x - size * 0.44, y + size * 0.056);
    bezierVertex(
      x - size * 0.46,
      y + size * 0.098,
      x - size * 0.45,
      y + size * 0.28,
      x - size * 0.27,
      y + size * 0.42
    );
    vertex(x - size * 0.27, y + size * 0.42);
    bezierVertex(
      x - size * 0.09,
      y + size * 0.55,
      x + size * 0.19,
      y + size * 0.5,
      x + size * 0.27,
      y + size * 0.42
    );
    vertex(x + size * 0.27, y + size * 0.42);
    bezierVertex(
      x + size * 0.29,
      y + size * 0.41,
      x + size * 0.5,
      y + size * 0.22,
      x + size * 0.44,
      y + size * 0.056
    );
    endShape();
    pop();

    //face
    // left
    push();
    fill(255);
    beginShape();
    vertex(x - size * 0.2, y - size * 0.3);
    bezierVertex(
      x - size * 0.25,
      y - size * 0.3,
      x - size * 0.38,
      y - size * 0.28,
      x - size * 0.4,
      y - size * 0.12
    );
    vertex(x - size * 0.36, y - size * 0.1);
    bezierVertex(
      x - size * 0.5,
      y - size * 0.2,
      x - size * 0.55,
      y + size * 0.05,
      x - size * 0.38,
      y + size * 0.08
    );
    vertex(x - size * 0.38, y + size * 0.08);
    bezierVertex(
      x - size * 0.2,
      y + size * 0.09,
      x - size * 0.23,
      y + size * 0.05,
      x,
      y + size * 0.09
    );
    endShape();
    pop();

    // right
    push();
    beginShape();
    vertex(x + size * 0.2, y - size * 0.3);
    bezierVertex(
      x + size * 0.25,
      y - size * 0.3,
      x + size * 0.38,
      y - size * 0.28,
      x + size * 0.4,
      y - size * 0.12
    );
    vertex(x + size * 0.36, y - size * 0.1);
    bezierVertex(
      x + size * 0.5,
      y - size * 0.2,
      x + size * 0.55,
      y + size * 0.05,
      x + size * 0.38,
      y + size * 0.08
    );
    vertex(x + size * 0.38, y + size * 0.08);
    bezierVertex(
      x + size * 0.2,
      y + size * 0.09,
      x + size * 0.23,
      y + size * 0.05,
      x,
      y + size * 0.09
    );
    endShape();
    pop();

    //fill
    push();
    beginShape();
    noStroke();
    vertex(x + size * 0.2, y - size * 0.3);
    vertex(x - size * 0.2, y - size * 0.3);
    vertex(x, y + size * 0.09);
    endShape(CLOSE);
    pop();

    // mouth
    push();
    fill(255, 0, 0);
    strokeWeight(1);
    beginShape();
    vertex(x - size * 0.38, y + size * 0.08);
    bezierVertex(
      x - size * 0.3,
      y + size * 0.09,
      x - size * 0.23,
      y + size * 0.05,
      x - size * 0.002,
      y + size * 0.04
    );
    vertex(x - size * 0.002, y + size * 0.04);
    bezierVertex(
      x + size * 0.3,
      y + size * 0.09,
      x + size * 0.23,
      y + size * 0.05,
      x + size * 0.38,
      y + size * 0.08
    );
    vertex(x + size * 0.38, y + size * 0.08);
    bezierVertex(
      x + size * 0.3,
      y + size * 0.24,
      x - size * 0.02,
      y + size * 0.7,
      x - size * 0.38,
      y + size * 0.08
    );
    endShape(CLOSE);
    pop();

    //tongue
    push();
    fill(128, 0, 0);
    beginShape();
    vertex(x - size * 0.2, y + size * 0.31);
    bezierVertex(
      x - size * 0.2,
      y + size * 0.3,
      x - size * 0.14,
      y + size * 0.18,
      x - size * 0.02,
      y + size * 0.28
    );
    vertex(x - size * 0.02, y + size * 0.28);
    bezierVertex(
      x + size * 0.005,
      y + size * 0.25,
      x + size * 0.14,
      y + size * 0.18,
      x + size * 0.2,
      y + size * 0.31
    );
    vertex(x + size * 0.2, y + size * 0.31);
    bezierVertex(
      x + size * 0.122,
      y + size * 0.382,
      x - size * 0.053,
      y + size * 0.453,
      x - size * 0.2,
      y + size * 0.31
    );
    endShape(CLOSE);
    pop();

    // eyes
    //left eye
    push();
    fill(255);
    ellipse(x - size * 0.1, y - size * 0.3, size * 0.2, size * 0.25);
    fill(0);
    ellipse(x - size * 0.05, y - size * 0.3, size * 0.06, size * 0.1);
    fill(255);
    noStroke();
    ellipse(x - size * 0.04, y - size * 0.3, size * 0.02, size * 0.03);
    pop();

    // right eye
    push();
    fill(255);
    ellipse(x + size * 0.1, y - size * 0.3, size * 0.2, size * 0.25);
    fill(0);
    ellipse(x + size * 0.05, y - size * 0.3, size * 0.06, size * 0.1);
    fill(255);
    noStroke();
    ellipse(x + size * 0.04, y - size * 0.3, size * 0.02, size * 0.03);
    pop();

    // nose
    push();
    fill(255, 0, 0);
    ellipse(x, y - size * 0.15, size * 0.13, size * 0.13);
    fill(255);
    line(x, y - size * 0.08, x - size * 0.002, y + size * 0.04);
    noStroke();
    ellipse(x - size * 0.02, y - size * 0.15, size * 0.05, size * 0.05);
    pop();

    // whiskers
    push();
    strokeWeight(1);
    // left
    line(x - size * 0.13, y - size * 0.13, x - size * 0.36, y - size * 0.19);
    line(x - size * 0.13, y - size * 0.078, x - size * 0.4, y - size * 0.083);
    line(x - size * 0.13, y - size * 0.019, x - size * 0.42, y);
    // right
    line(x + size * 0.13, y - size * 0.13, x + size * 0.36, y - size * 0.19);
    line(x + size * 0.13, y - size * 0.078, x + size * 0.4, y - size * 0.083);
    line(x + size * 0.13, y - size * 0.019, x + size * 0.42, y);
    pop();
  }
}
