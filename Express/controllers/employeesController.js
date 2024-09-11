// const data = {
//     employees: require('../data/employees.json'),
//     setEmployees: function (data) {
//         this.employees = data
//     }
// };

const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
    const employees = await Employee.find({});
    if (!employees) return res.status(204).json({ 'message': 'No employees found' });
    res.json(employees);
}

const createEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({
            'message': 'First and last names are required.'
        });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        console.log(result);
        res.status(201).json(data.employees);
    }
    catch (err) {
        console.error(err);
    }

    // const newEmployee = {
    //     id: data.employees[data.employees.length - 1].id + 1 || 1,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }
    //data.setEmployees([...data.employees, newEmployee]);
}

const updateEmployee = async (req, res) => {
    if (req?.body?.id) return res.status(400).json({ 'message': 'Id is required.' });

    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(400).json({
            'message': `Employee Id ${req.body.id} not found`
        });
    }

    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    // const filleredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArray = [...filleredArray, employee];
    // data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    await employee.save();
    res.status(200).json(data.employees);
}

const deleteEmployee = async (req, res) => {
    if (req?.body?.id) return res.status(400).json({ 'message': 'Id is required.' });

    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(400).json({
            'message': `Employee Id ${req.body.id} not found`
        });
    }
    // const filleredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // data.setEmployees([...filleredArray]);
    await Employee.deleteOne({ _id: req.body.id });
    res.status(200).json(data.employees);
}

const getEmployee = async (req, res) => {
    if (req?.params?.id) return res.status(400).json({ 'message': 'Id is required.' });

    // const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(400).json({
            'message': `Employee Id ${req.body.id} not found`
        });
    }

    res.status(200).json(employee);
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
