var currRow = null; 
//when the user
function queryCreate() {
	event.preventDefault();
    var newQuery = readForm();
    if (currRow == null){
        insertNewQuery(newQuery);
	}else{
        updateQuery(newQuery);
    }
    resetBars();    
}
//Read the query
function readForm() {
    var newQuery = {};
    newQuery["longitude"] = document.getElementById("longitude").value;
    newQuery["latitude"] = document.getElementById("latitude").value;
    newQuery["timezone"] = document.getElementById("timezone").value;
    newQuery["days"] = document.getElementById("days").value;
    return newQuery;
}
//Insert new query into table
function insertNewQuery(data) {
    var table = document.getElementById("inputList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell1 = newRow.insertCell(1);
    cell2 = newRow.insertCell(2);
    cell3 = newRow.insertCell(3);
	cell0.innerHTML = data.longitude;
	cell1.innerHTML = data.latitude;
	cell2.innerHTML = data.timezone;
	cell3.innerHTML = data.days;
// create a column for the 'Edit' and "Delete' buttons for each search query
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="editQuery(this)">Edit</button> <button onClick="deleteQuery(this)">Delete</button>`;
}

//Edit a preexisting query
function editQuery(td) {
    currRow = td.parentElement.parentElement;
    document.getElementById("longitude").value = currRow.cells[0].innerHTML;
    document.getElementById("latitude").value = currRow.cells[1].innerHTML;
    document.getElementById("timezone").value = currRow.cells[2].innerHTML;
    document.getElementById("days").value = currRow.cells[3].innerHTML;
}
//Delete a query
function deleteQuery(td) {
    row = td.parentElement.parentElement;
    document.getElementById('inputList').deleteRow(row.rowIndex);
    resetBars();
}
//Update the table of queries with the new values 
function updateQuery(newQuery) {
    currRow.cells[0].innerHTML = newQuery.longitude;
    currRow.cells[1].innerHTML = newQuery.latitude;
    currRow.cells[2].innerHTML = newQuery.timezone;
    currRow.cells[3].innerHTML = newQuery.days;
}

//Reset the input bars to be empty
function resetBars() {
    document.getElementById("longitude").value = '';
    document.getElementById("latitude").value = '';
    document.getElementById("timezone").value = '';
    document.getElementById("days").value = '';
    currRow = null;
}