let Circle = function (circle) {
    this.x = 0;
    this.y = 0;
    this.radius = 1;
    this.color = "Blue";
    this.thickness = 1;
    this.style = "SOLID";
    for (let p in circle) {
        if (this.hasOwnProperty(p))
            this[p] = circle[p];
    }
};
let c1 = new Circle({
    x: 1,
    y: 2,
    radius: 100,
    color: "Red"
});
let c2 = new Circle({});
let c3 = new Circle();
let sum = function (scale, ...numbers) {
    return scale * numbers.reduce((s, x) => s + x, 0);
}
let gun = function (x, y, z) {
    if (arguments.length !== 3)
        throw "You must provide 3 params";
    return x * y + z;
}
let fun = function (x = 1, y = 2, z = 3) {
//            x = x || 1;
//            y = y || 2;
//            z = z || 3;
    return x * y + z;
}
console.log(fun())  // 5
console.log(fun(4)) // // 11
console.log(fun(4, 8)) // 35
console.log(fun(4, 8, 15))
console.log(fun(4, 8, 15, 16, 23, 42))
console.log(gun(1, 2, 3));
console.log(sum(10, 1, 2, 3, 4, 5, 6, 7, 8, 9));
