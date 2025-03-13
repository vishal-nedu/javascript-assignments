var totalexpense=0;
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    let expense = document.getElementById("things").value;
    let amount = document.getElementById("num").value;
    let date = document.getElementById("dat").value;

    if (expense && amount && date) {
        let table = document.getElementById("expensebody");

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense}</td>
            <td>${amount}</td>
            <td>${date}</td>
            <td>
                <button onclick="editExpense(this)">Edit</button>
                <button onclick="deleteExpense(this)">Delete</button>
            </td>
        `;

        table.appendChild(row);
    }
    totalexpense+=parseInt(amount);
    let sh=document.getElementById("total")
    sh.textContent="Total expenses:rs."+totalexpense;
    document.getElementById("things").value="";
    document.getElementById("num").value="";
    document.getElementById("dat").value="";
});

function deleteExpense(button) {
    let row = button.parentElement.parentElement;
    let amount = row.cells[1].textContent;
    totalexpense-=parseInt(amount);
    let sh=document.getElementById("total")
    button.parentElement.parentElement.remove();
    sh.textContent="Total expenses:rs."+totalexpense;

}

function editExpense(button) {
    let row = button.parentElement.parentElement;
    let expense = row.cells[0].textContent;
    let amount = row.cells[1].textContent;
    let date = row.cells[2].textContent;

    document.getElementById("things").value = expense;
    document.getElementById("num").value = amount;
    document.getElementById("dat").value = date;

    row.remove();
    totalexpense-=parseInt(amount);
    let sh=document.getElementById("total")
    sh.textContent="Total expenses:rs."+totalexpense;
}