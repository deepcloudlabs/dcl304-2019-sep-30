numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
[x, y, ...z] = numbers;
console.log(z);
[x = 3, y = 5, ...z] = [];
// x = 3
// y = 5
// z = []
let circle = {x: 0, y: 1, radius: 100, color: "red", thickness: 1, style: "solid"};
let {x, y, ...rest} = {...circle};
console.log(x, y, rest);
let [first, second, third, ...rest] = Object.entries(circle);
[[k1, v1], [k2, v2], [k3, v3], ...rest] = Object.entries(circle);

let jack = {
    identity: "123",
    name: {first: "jack", last: "bauer"},
    department: {id: 4, name: "IT"},
    salary: 100000
};

let { id, name } = jack.department;
let { fullname , salary } = jack ;

class Employee { constructor(identity,fullname,salary){
    this.identity = identity;
    this.fullname = fullname;
    this.salary = salary;
}}

let  employees = [
    new Employee("1","jack shephard",100000),
    new Employee("2","james sawyer",200000),
    new Employee("3","kate austen",300000),
];
let [{identity,fullname,...r},...s] = employees;