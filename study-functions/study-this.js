let Employee = function(identity,fullname,salary){
    // let self= this;
    this.identity = identity;
    this.fullname = fullname;
    this.salary = salary;
    this.sayHello = () => {
        console.log("Hello, "+this.fullname+"!");
    }
    // this.sayHello = this.sayHello.bind(this);
};
let jack = new Employee("1","jack bauer",100000);
// jack.sayHello();
window.fullname = "kate austen";
window.setTimeout( jack.sayHello , 1000);
console.log("Hello moon!");