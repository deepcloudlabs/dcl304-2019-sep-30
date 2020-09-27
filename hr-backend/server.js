import logger from "morgan";
import utils from "./utils";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger-hr-api';
import mongoose from "mongoose";

const port = 4001;
const app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(logger('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/**
 *  Using MongoDB with Mongoose
 *  hr: database name, mongo-cli.bat --> use hr
 */
const mongodbUrl = "mongodb://localhost:27017/hr"
mongoose.connect(mongodbUrl, {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "reconnectTries": 10,
    useUnifiedTopology: true
});
const employeeSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": {
        type: String,
        required: true,
        unique: true,
        validate: [
            utils.tcKimlikNoValidator,
            'You must provide a valid identity no'
        ]
    },
    "photo": {
        type: String,
        required: false,
        default: utils.NO_IMAGE
    },
    "iban": {
        type: String,
        required: true,
        unique: true,
        validate: [
            utils.ibanValidator,
            'You must provide a iban no'
        ]
    },
    "birthYear": {
        type: Number,
        required: true
    },
    "salary": {
        type: Number,
        required: true,
        min: 3000
    },
    "fulltime": {
        type: Boolean,
        required: false,
        default: true
    },
    "department": {
        type: String,
        enum: ["IT", "Sales", "Finance", "HR"],
        required: false,
        default: "Sales"
    }
});
const Employee = mongoose.model('employees',
    employeeSchema);
/**
 * Swagger Configuration
 */
// http://localhost:4001/api-docs
app.use("/api-docs", swaggerUi.serve,
    swaggerUi.setup(swaggerDocument));

/**
 * Restful Services
 */
app.post("/employees", (req, res) => {
    let emp = req.body;
    emp._id = mongoose.Types.ObjectId();
    let employee = new Employee(emp);
    employee.save((err, newemp) => {
        res.set("Content-Type", "application/json");
        if (err)
            res.status(404).send({"status": err});
        else
            res.status(200).send({"status": "OK"});
    });
});
app.put("/employees", (req, res) => {
    let updatableFields = [
        "salary", "photo", "department", "fulltime", "iban"
    ];
    let emp = req.body;
    let updatedEmp = {};
    for (let field in emp) {
        if (updatableFields.includes(field))
            updatedEmp[field] = emp[field];
    }
    Employee.update(
        {"identityNo": emp.identityNo},
        {$set: updatedEmp},
        {upsert: false},
        (err, employee) => {
            res.set("Content-Type", "application/json");
            if (err)
                res.status(404).send({"status": err});
            else
                res.status(200).send(employee);
        }
    );
});
app.get("/employees/:identity", (req, res) => {
    let identity = req.params.identity;
    Employee.findOne(
        {'identityNo': identity},
        {"_id": false},
        (err, emp) => {
            if (err)
                res.status(404).send({"status": err});
            else if (emp == null)
                res.status(404).send({"status": "NOT FOUND"});
            else
                res.status(200).send(emp);

        }
    );
});
app.delete("/employees/:identity", (req, res) => {
    let identity = req.params.identity;
    Employee.findOneAndDelete(
        {'identityNo': identity},
        {"_id": false},
        (err, emp) => {
            if (err)
                res.status(404).send({"status": err});
            else if (emp == null)
                res.status(404).send({"status": "NOT FOUND"});
            else
                res.status(200).send(emp);

        }
    );
});
// http://localhost:4001/employees?page=1&size=10
app.get("/employees", (req, res) => {
    let page = Number(req.query.page);
    let size = Number(req.query.size);
    let offset = (page - 1) * size;
    Employee.find({}, {"_id": false},
        {skip: offset, limit: size},
        (err, employees) => {
            if (err)
                res.status(404).send({"status": err});
            else
                res.status(200).send(employees);
        }
    );
});
app.listen(port);
console.log("Server is running at ", port);






