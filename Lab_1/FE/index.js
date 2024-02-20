function fetchEmployees() {
  fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = ""; // Clear the table for the updated list
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteButton.onclick = function () {
          deleteEmployee(item.id);
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
}
document.addEventListener("DOMContentLoaded", function () {
  fetchEmployees(); // Initial fetch to populate the employee list

  // Event listener for the form to add a new employee
  document
    .getElementById("employeeForm")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission
      createEmployee(); // Call the createEmployee function
    });
});

function createEmployee() {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  fetch("http://localhost:3000/api/v1/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchEmployees(); // Refresh the list after adding
    })
    .catch((error) => console.error("Error:", error));
}

function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      fetchEmployees(); // Refresh the list after deleting
    })
    .catch((error) => console.error("Error:", error));
}

fetchEmployees(); // Call fetchEmployees to load the list initially
