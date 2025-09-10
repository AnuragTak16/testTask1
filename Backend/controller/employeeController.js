import Employee from '../model/employeeModel.js';

// CREATE Employee
export const createEmployee = async (req, res) => {
  const { company, email, phone, position, numberOfLeads, status } = req.body;
  console.log(req.body);

  try {
    // Check if employee with same email exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const newEmployee = new Employee({
      company,
      email,
      phone,
      position,
      numberOfLeads,
      status,
    });

    await newEmployee.save();

    res.status(201).json({
      message: 'Employee created successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Create Employee Error:', error);
    res.status(500).json({ error: 'Server error while creating employee' });
  }
};

// GET ALL Employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Get Employees Error:', error.message);
    res.status(500).json({ error: 'Server error while fetching employees' });
  }
};

// UPDATE Employee
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({
      message: 'Employee updated successfully',
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error('Update Employee Error:', error.message);
    res.status(500).json({ error: 'Server error while updating employee' });
  }
};

// DELETE Employee

export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete Employee Error:', error.message);
    res.status(500).json({ error: 'Server error while deleting employee' });
  }
};

//count of employees
export const countEmployees = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees count' });
  }
};
