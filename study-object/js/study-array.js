// how to create an array (1)
arr1 = [];
arr1[0] = 4;
arr1[1] = 8;
arr1[2] = 15;
arr1[3] = 16;
arr1[4] = 23;
arr1[5] = 42;
// how to create an array (2)
arr1 = [4, 8, 15, 16, 23, 42];
// how to create an array (3)
arr1 = new Array(4, 8, 15, 16, 23, 42);
// how to create an array (4)
arr1 = [];
arr1.push(4);
arr1.push(8);
arr1.push(15);
arr1.push(16);
arr1.push(23);
arr1.push(42);
arr1 = new Array(108)
// asc. order
arr1.sort(function (x, y) {
    return x - y;
})
// desc. order
arr1.sort(function (x, y) {
    return y - x;
})
// reverse array
arr1.reverse()
// how to clear an array
arr1.splice(0)
arr1 = [];
arr1.length = 0; // dangerous
arr1.indexOf(23); // >= 0 : found
arr1.indexOf(10); // -1 : not found
arr1.includes(23); // true
arr1.includes(10); // false

while (arr1.length > 0) {
    console.log(arr1.splice(0, 1));
}