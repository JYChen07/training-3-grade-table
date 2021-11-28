function addStudent() {
    const student = document.getElementById("student").value;
    const grade = document.getElementById("grade").value;
    const table = document.getElementById("gradeTable");
    const row_length = document.getElementById("gradeTable").rows.length;
    const row = table.insertRow(row_length-1);
    const cell_0 = row.insertCell(0);
    const cell_1 = row.insertCell(1);
    const cell_2 = row.insertCell(2);
    cell_0.innerHTML = student;
    cell_1.innerHTML = grade;
    cell_2.innerHTML = "*";

}