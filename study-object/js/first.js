let o = {}
o.x = 1;
o.y = 2;
o.radius = 100;
o.area = function () {
    return Math.PI * this.radius * this.radius;
}
console.log("Area: " + o.area());
let c = {
    x: 10,
    y: 100,
    radius: 200,
    area: function () {
        return Math.PI * this.radius * this.radius;
    }
};
console.log("Area: " + c.area());
let ser = JSON.stringify(o);
let u = JSON.parse(ser);
console.log(u);
