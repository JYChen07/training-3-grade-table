/*
 * addStudent adds a new row with the Student Name and Grade to the table.
 * 
 */
function addStudent() {
    const student = document.getElementById("student").value;
    const grade = document.getElementById("grade").value;
    const table = document.getElementById("gradeTable");
    const row_length = document.getElementById("gradeTable").rows.length;

    if (student!= "" && grade >= 0 && grade <= 100) {
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
    else if (student == "" && (grade < 0 || grade > 100 || grade == "")) {
        //if there is no valid student and grade print out an error 
        document.getElementById("check").innerHTML = "No student and proper grade inputs.";
    }
    else if (student == "") {
        //only invalid student string
        document.getElementById("check").innerHTML = "No student name has been inputted.";
    }
    else {
        //only invalid grade score
        document.getElementById("check").innerHTML = "Out of bounds grade input.";
    }
}