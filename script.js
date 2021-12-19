//verify if student name is valid (at least has something in the textbox)
function verifyName(name) {
    if (typeof name === 'string' && name != "") {
        return true;
    }
    return false;
}
//verify if grade is inputted in a range from 0 to 100
function verifyGrade(grade) { 
    if (typeof grade === 'number' && grade >= 0 && grade <= 100) {
        return true;
    }
    return false;
}
//verify function that takes in a name and grade and returns if input is valid
function verify(name, grade) {
    stu_ver = verifyName(name);
    grade_ver = verifyGrade(grade);
    if (!stu_ver && !grade_ver) {
        //if there is no valid student and grade print out an error 
        return document.getElementById("check").innerHTML = "No student and proper grade inputs.";
    }
    else if (!stu_ver) {
        //only invalid student string
        return document.getElementById("check").innerHTML = "No student name has been inputted.";
    }
    else if (!grade_ver) {
        //only invalid grade score
        return document.getElementById("check").innerHTML = "Out of bounds grade input.";
    }
    else
        return true;
}
// addStudent adds a new row with the Student Name and Grade to the table.
function addStudent() {
    const student = document.getElementById('student').value;
    const grade = parseInt(document.getElementById('grade').value, 10);
    const table = document.getElementById('gradeTable');
    const row_length = document.getElementById('gradeTable').rows.length;
    let verified = verify(student, grade);
    if (verified == true) {
        //checks if there is something inputted in student text box 
        //as well as a value of 0 to 100 for grade score
        const row_value = row_length - 1;
        const row = table.insertRow(row_value);
        const cell_0 = row.insertCell(0);
        const cell_1 = row.insertCell(1);
        const cell_2 = row.insertCell(2);
        row.setAttribute('id', 'row' + row_value);
        cell_0.innerHTML = student;
        cell_1.innerHTML = grade;
        cell_2.innerHTML = "<input type='button' value='Edit' id='edit_" + row_value + "' class='edit' onclick='edit_row(" + row_value + ");' />" +
            "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row_value + ");'>";
    }
}
//delete option
function delete_row(row) {
    const row_del = document.getElementById(`row${row}`);
    row_del.remove();
    const tr_edit = document.getElementById(`row_edit${row}`);
    if (tr_edit != null) {
        tr_edit.remove();
    }
}
//edit option
function edit_row(row) {
    const table = document.getElementById('gradeTable');
    const tr = document.getElementById(`row${row}`);
    const td = tr.getElementsByTagName("td");
    const new_row = table.insertRow(tr.rowIndex);
    document.getElementById(`row${row}`).style.display = "none";
    const cell_0 = new_row.insertCell(0);
    const cell_1 = new_row.insertCell(1);
    const cell_2 = new_row.insertCell(2);
    new_row.setAttribute('id', 'row_edit' + row);
    cell_0.innerHTML = "<input type='text' name='student' placeholder='Student Name' id='student"+row+"' value=" + td[0].innerHTML + ">";
    cell_1.innerHTML = "<input type='number' name='grade' placeholder='Grade' id='grade"+row+"' min='0' max='100' value="+ td[1].innerHTML + ">";
    cell_2.innerHTML = "<input type='button' value='Save' id='save_" + row + "' class='save' onclick='save_row(" + row + ");' />" 
        + "<input type='button' value='Cancel' id='cancel_" + row + "' class='cancel' onclick='cancel_row(" + row + ");' />"
        + "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row + ");' />";
}
//cancel the edit and return original row
function cancel_row(row) {
    const row_del = document.getElementById(`row_edit${row}`);
    row_del.remove();
    document.getElementById(`row${row}`).style.display = "table-row";
}
//save the edit
function save_row(row) {
    const tr = document.getElementById(`row${row}`);
    const td = tr.getElementsByTagName("td");
    const student = document.getElementById('student'+row).value;
    const grade = parseInt(document.getElementById('grade'+row).value, 10);
    let verified = verify(student, grade);

    if (verified == true) {
        //checks if there is something inputted in student text box 
        //as well as a value of 0 to 100 for grade score
        td[0].innerHTML = student;
        td[1].innerHTML = grade;
        td[2].innerHTML = "<input type='button' value='Edit' id='edit_" + row + "' class='edit' onclick='edit_row(" + row + ");' />" +
            "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row + ");'>";
        cancel_row(row);
    }
}

function api_add() {
    let request = new XMLHttpRequest();
    let data = "";
    let name = "";
    let grade = 0;
    request.open("GET", "https://randomuser.me/api/?results=1", true);
    request.onload = function (e) {
        if (request.readyState === 4 && request.status === 200) {
            data = request.responseText;
            data = JSON.parse(data);
            name = data.results[0].name.first + " " + data.results[0].name.last;
            grade = data.results[0].dob.age;

            const table = document.getElementById('gradeTable');
            const row_length = document.getElementById('gradeTable').rows.length;
            const row_value = row_length - 1;
            const row = table.insertRow(row_value);
            const cell_0 = row.insertCell(0);
            const cell_1 = row.insertCell(1);
            const cell_2 = row.insertCell(2);
            row.setAttribute('id', 'row' + row_value);
            cell_0.innerHTML = name;
            cell_1.innerHTML = grade;
            cell_2.innerHTML = "<input type='button' value='Edit' id='edit_" + row_value + "' class='edit' onclick='edit_row(" + row_value + ");' />" +
                "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row_value + ");'>";
        }
    }
    request.send(null);
}