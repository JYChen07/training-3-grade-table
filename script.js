let studentList = [];

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
function addStudent(student, grade, load) {
    if (student == null)
        student = document.getElementById('student').value;
    if (grade == null)
        grade = parseInt(document.getElementById('grade').value, 10);
    const table = document.getElementById('tbody');
    const row_value = document.getElementById('tbody').rows.length;
    let verified = verify(student, grade);
    if (verified == true) {
        //checks if there is something inputted in student text box 
        //as well as a value of 0 to 100 for grade score
        const row = table.insertRow(row_value);
        const cell_0 = row.insertCell(0);
        const cell_1 = row.insertCell(1);
        const cell_2 = row.insertCell(2);
        row.setAttribute('id', 'row' + row_value);

        var div_stu = document.createElement("div");
        div_stu.textContent = student;
        div_stu.setAttribute("class", "original");
        cell_0.appendChild(div_stu);

        var div_grade = document.createElement("div");
        div_grade.textContent = grade;
        div_grade.setAttribute("class", "original");
        cell_1.appendChild(div_grade);

        var div_options = document.createElement("div");
        div_options.innerHTML = "<input type='button' value='Edit' onclick='edit_row(" + row_value + ");' />" +
            "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row_value + ");'>";
        div_options.setAttribute("class", "original");
        cell_2.appendChild(div_options);

        var div_edit_stu = document.createElement("div");
        div_edit_stu.innerHTML = "<input type='text' id='student" + row_value + "' value=" + student + ">";
        div_edit_stu.setAttribute("class", "edit");
        cell_0.appendChild(div_edit_stu);

        var div_edit_grade = document.createElement("div");
        div_edit_grade.innerHTML = "<input type='number' id='grade" + row_value + "' min='0' max='100' value=" + grade + ">";
        div_edit_grade.setAttribute("class", "edit");
        cell_1.appendChild(div_edit_grade);

        var div_edit_options = document.createElement("div");
        div_edit_options.innerHTML = "<input type='button' value='Save' id='save_" + row_value + "' class='save' onclick='save_row(" + row_value + ");' />"
            + "<input type='button' value='Cancel' id='cancel_" + row_value + "' class='cancel' onclick='cancel_row(" + row_value + ");' />"
            + "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row_value + ");' />";
        div_edit_options.setAttribute("class", "edit");
        cell_2.appendChild(div_edit_options);

        const hidden = document.getElementById(`row${row_value}`).getElementsByClassName("edit");
        for (var i = 0; i < hidden.length; i++) {
            hidden[i].style.display = 'none';
        }
        const student_obj = {
            name: student,
            grade: grade,
        };
        if (load != true) {
            studentList.push(student_obj);
            localStorage.setItem("studentList", JSON.stringify(studentList));
        }
    }
}
//delete option
function delete_row(row) {
    const row_del = document.getElementById(`row${row}`);
    row_del.remove();
    var del = parseInt(row);
    console.log(del);
    studentList.splice(del, 1);
    localStorage.setItem("studentList", JSON.stringify(studentList));

    var tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    reload(true);

}
//edit option
function edit_row(row) {
    const original = document.getElementById(`row${row}`).getElementsByClassName("original");
    const edit = document.getElementById(`row${row}`).getElementsByClassName("edit");
    for (var i = 0; i < original.length; i++) {
        original[i].style.display = 'none';
    }
    for (var j = 0; j < edit.length; j++) {
        edit[j].style.display = 'initial';
    }
}
//cancel the edit and return original row
function cancel_row(row) {
    const original = document.getElementById(`row${row}`).getElementsByClassName("original");
    const edit = document.getElementById(`row${row}`).getElementsByClassName("edit");
    for (var i = 0; i < original.length; i++) {
        original[i].style.display = 'initial';
    }
    for (var j = 0; j < edit.length; j++) {
        edit[j].style.display = 'none'; 
    }
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
        const original = document.getElementById(`row${row}`).getElementsByClassName("original");
        original[0].textContent = student;
        original[1].textContent = grade;
        original[2].innerHTML = "<input type='button' value='Edit' onclick='edit_row(" + row + ");' />" +
            "<input type='button' value='Delete' class='delete' onclick='delete_row(" + row + ");'>";
        const edit = document.getElementById(`row${row}`).getElementsByClassName("edit");
        console.log(edit[0]);
        edit[0].setAttribute = ("text", student);
        edit[1].setAttribute = ("number", grade);
        cancel_row(row);

        const student_obj = {
            name: student,
            grade: grade,   
        };
        var del = parseInt(row);
        studentList.splice(parseInt(row), 1, student_obj);
        localStorage.setItem("studentList", JSON.stringify(studentList));
        
    }
}

function api_add() {
    let request = new XMLHttpRequest();
    let data = "";
    let name = "";
    let grade = 0;
    
    request.open("GET", "https://randomuser.me/api/?results=10", true);
    request.onload = function (e) {
        if (request.readyState === 4 && request.status === 200) {
            data = request.responseText;
            data = JSON.parse(data);
            for (let index = 0; index < 10; index++) {
                name = data.results[index].name.first + " " + data.results[index].name.last;
                grade = data.results[index].dob.age;
                addStudent(name, parseInt(grade, 10));
            }
        }
    }
    request.send(null);
}

function reload(load) {
data = JSON.parse(window.localStorage.getItem('studentList'));
    for (let index = 0; index < data.length; index++) {
        name = data[index].name;
        grade = data[index].grade;
        addStudent(name, parseInt(grade, 10), load);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    reload();
})