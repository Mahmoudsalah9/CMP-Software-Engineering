const employee = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params; // Get the id of the employee to delete
  const index = employee.findIndex((emp) => emp.id === id);
  if (index > -1) {
    employee.splice(index, 1); // Remove the employee from the array
    res.status(200).json({ message: "Employee deleted successfully" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};
 
// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body; // Get the id and name from the request body
  const exists = employee.some((emp) => emp.id === id);
  if (!exists) {
    employee.push({ id, name }); // Add the new employee to the array
    res.status(201).json({ message: "Employee created successfully" });
  } else {
    res.status(400).json({ message: "Employee already exists" });
  }
};
