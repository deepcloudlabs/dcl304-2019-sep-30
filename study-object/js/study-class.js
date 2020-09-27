let Circle = function (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.area = function () {
        return Math.PI * this.radius * this.radius;
    }
};

let c1 = new Circle(0, 0, 100);
let c2 = new Circle(10, 20, 30);
console.log(c1.area());
console.log(c2.area());
Circle.prototype.color = "Red";
c1.hasOwnProperty('color') // false
c1.color = "Blue";
c1['color'] // c1.color
let attr = 'radius';
console.log(c1[attr]); // 100
console.log(c1.attr); // undefined

c1.hasOwnProperty('color') // true
c2.hasOwnProperty('color') // false

for (let p in c1) { // reflection
    if (typeof c1[p] === "function") continue;
    console.log(p + " : " + c1[p]);
}

