
function verifyName(name) { //verifies if there is a Student Name
    if (typeof name === 'string' && name != "") {
        return true;
    }
    return false;
}

function verifyGrade(grade) { //verifies if there is a valid grade
    if (typeof grade === 'number' && grade >= 0 && grade <= 100) {
        return true;
    }
    return false;
}

// addStudent adds a new row with the Student Name and Grade to the table.
function addStudent() {
    const student = document.getElementById('student').value;
    const grade = parseInt(document.getElementById('grade').value, 10);
    const table = document.getElementById('gradeTable');
    const row_length = document.getElementById('gradeTable').rows.length;
    let verify_student = verifyName(student);
    let verify_grade = verifyGrade(grade);
    //console.log(verify_student + " - " + verify_grade);

    if (verify_student && verify_grade) {
        //checks if there is something inputted in student text box 
        //as well as a value of 0 to 100 for grade score
        const row_value = row_length - 1
        const row = table.insertRow(row_value);
        const cell_0 = row.insertCell(0);
        const cell_1 = row.insertCell(1);
        const cell_2 = row.insertCell(2);
        row.setAttribute('id', 'row' + row_value);
        cell_0.innerHTML = student;
        cell_1.innerHTML = grade;
        cell_2.innerHTML = "<input type='button' value='Edit' id='edit_" + row_value + "' class='save' onclick='edit_row(" + row_value + ");' />" +
            "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row_value + ");'>";
        console.log(row);
    }
    else if (!verify_student && !verify_grade) {
        //if there is no valid student and grade print out an error 
        document.getElementById("check").innerHTML = "No student and proper grade inputs.";
    }
    else if (!verify_student) {
        //only invalid student string
        document.getElementById("check").innerHTML = "No student name has been inputted.";
    }
    else if (!verify_grade) {
        //only invalid grade score
        document.getElementById("check").innerHTML = "Out of bounds grade input.";
    }
}
//delete option
function delete_row(row) {
    const row_del = document.getElementById(`row${row}`);
    console.log(row_del);
    row_del.remove();
}
//edit option
function edit_row(row) {
    const tr = document.getElementById(`row${row}`);
    const td = tr.getElementsByTagName("td");
    td[0].innerHTML = "<input type='text' name='student' placeholder='Student Name' id='student' value=" + td[0].innerHTML + ">";
    td[1].innerHTML = "<input type='number' name='grade' placeholder='Grade' id='grade' min='0' max='100' value="+ td[1].innerHTML + ">";
    td[2].innerHTML = "<input type='button' value='Save' id='save_" + row + "' class='save' onclick='save_row(" + row + ");' />" +
        "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row + ");' />";
    console.log(td[2]);
}

function save_row(row) {

}