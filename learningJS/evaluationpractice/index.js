let data = [
    { id: 1, name: "John Doe", age: 28, email: "john.doe@example.com", salary: 50000 },
    { id: 2, name: "Jane Smith", age: 34, email: "jane.smith@example.com", salary: 65000 },
    { id: 3, name: "Alice Johnson", age: 29, email: "alice.j@example.com", salary: 54000 },
    { id: 4, name: "Bob Brown", age: 45, email: "bob.brown@example.com", salary: 75000 },
    { id: 5, name: "Charlie Black", age: 38, email: "charlie.black@example.com", salary: 69000 }
];

let columns = Object.keys(data[0]);
let filterData = [...data];

function generateTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');

    columns.forEach((column, indx) => {
        const th = document.createElement('th');
        th.textContent = column;
        th.addEventListener('click', () => sortTable(column));
        if (indx === 0) th.classList.add('freezecol'); 
        headerRow.appendChild(th);
    });

    const deleteHeader = document.createElement('th');
    deleteHeader.textContent = 'Delete';
    headerRow.appendChild(deleteHeader);
    thead.appendChild(headerRow);

    data.forEach((row, rowindex) => {
        const tr = document.createElement('tr');
        columns.forEach((column, colindex) => {
            const td = document.createElement('td');
            td.textContent = row[column];
            td.contentEditable = true;
            td.addEventListener('blur', () => updateData(rowindex, column, td.textContent));
            if (colindex === 0) td.classList.add('freezecol');
            tr.appendChild(td);
        });

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deletebutton');
        deleteButton.addEventListener('click', () => deleteRow(rowindex));
        deleteCell.appendChild(deleteButton);
        tr.appendChild(deleteCell);
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

function updateData(rowindex, column, newValue) {
    data[rowindex][column] = newValue;
    filterData = [...data];
    renderTable();
}

function deleteRow(rowindex) {
    data.splice(rowindex, 1);
    filterData = [...data];
    renderTable();
}

function sortTable(column) {
    const isNumericColumn = typeof filterData[0][column] === 'number';

    filterData.sort((a, b) => {
        if (isNumericColumn) {
            return a[column] - b[column]; 
        } else {
            return a[column].localeCompare(b[column]); 
        }
    });
    renderTable();
}

function applyFilter() {
    const filterValue = document.getElementById('filterinput').value.toLowerCase();
    
    // Filter each row's values
    filterData = data.filter(row => {
        // Check if any value in the row matches the filter
        return Object.values(row).some(value => 
            value.toString().toLowerCase().includes(filterValue)
        );
    });

    renderTable();  // Re-render the filtered table
}


function addRow() {
    const newRow = {};
    columns.forEach(column => {
        newRow[column] = ''; 
    });
    data.push(newRow);
    filterData = [...data];
    renderTable(); 
}

function addColumn() {
    const columnName = prompt("Enter column name");
    if (columnName) {
        columns.push(columnName);
        data.forEach(row => {
            row[columnName] = ''; 
        });
        filterData = [...data];
        renderTable();
    }
}

function renderTable() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // Clear previous table content
    tableContainer.appendChild(generateTable(filterData));
}

document.getElementById('addRow').addEventListener('click', addRow);
document.getElementById('addcolumn').addEventListener('click', addColumn);
document.getElementById('applyfilter').addEventListener('click', applyFilter);  // Use correct function name
document.getElementById('Clearfilter').addEventListener('click', () => {
    document.getElementById('filterinput').value = '';
    filterData = [...data];
    renderTable();
});

renderTable(); 