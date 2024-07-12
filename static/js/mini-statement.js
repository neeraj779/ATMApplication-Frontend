function createTable(data) {
  const table = document.createElement("table");
  const header = table.createTHead();
  const headerRow = header.insertRow();
  for (const key in data[0]) {
    const th = document.createElement("th");
    th.textContent = key.toUpperCase();
    headerRow.appendChild(th);
  }

  const tbody = table.createTBody();
  data.forEach((item) => {
    const row = tbody.insertRow();
    for (const key in item) {
      const cell = row.insertCell();
      cell.textContent = item[key];
    }
  });

  return table;
}

let cardNumber = localStorage.getItem("cardNumber");
let pin = localStorage.getItem("pin");

fetch(`http://localhost:5236/api/Transaction/GetAllTransactions`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ cardNumber, pin }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    console.log(data);
    const transactions = JSON.parse(data);
    const tableContainer = document.getElementById("table-container");
    const table = createTable(transactions);
    tableContainer.appendChild(table);
  })
  .catch((error) => {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops... we ran into some trouble :(",
      text: "Failed to initiate the process.",
    });
  });
