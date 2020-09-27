function draw(min = 1, max = 50, size = 6) {
    return new Promise( (resolve, reject) => {
        setTimeout( ()=>{
                let numbers = [];
                while (numbers.length != size) {
                    let num = Math.floor(Math.random() * (max - min + 1)) + min;
                    if (!numbers.includes(num))
                        numbers.push(num);
                }
                numbers.sort((x, y) => x - y);
                resolve(numbers);
            } ,  3000);
    });
}

draw(1,50,8).then(
    numbers => console.log(numbers)
)
console.log("Hello world!");
let draw_es6 = (min = 1, max = 50, size = 6) => {
    return new Array(size).fill(1).map(i => Math.floor(Math.random() * (max - min + 1)) + min).sort((x, y) => x - y);
};
