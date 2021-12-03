
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

/*
 * addStudent adds a new row with the Student Name and Grade to the table.
 * 
 */
function addStudent() {
    const student = document.getElementById("student").value;
    const grade = parseInt(document.getElementById("grade").value, 10);
    const table = document.getElementById("gradeTable");
    const row_length = document.getElementById("gradeTable").rows.length;

    let verify_student = verifyName(student);
    let verify_grade = verifyGrade(grade);
    //console.log(verify_student + " - " + verify_grade);
    console.log(grade);
    if (verify_student && verify_grade) {
        //checks if there is something inputted in student text box 
        //as well as a value of 0 to 100 for grade score
        const row = table.insertRow(row_length - 1);
        const cell_0 = row.insertCell(0);
        const cell_1 = row.insertCell(1);
        const cell_2 = row.insertCell(2);
        cell_0.innerHTML = student;
        cell_1.innerHTML = grade;
        cell_2.innerHTML = "";
        document.getElementById("check").innerHTML = "";
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