function loadAttendanceData() {
    const savedAttendanceData = localStorage.getItem('attendanceData');
    if (savedAttendanceData) {
        return JSON.parse(savedAttendanceData);
    } else {
        return {
            "9:00-10:30": { "Monday": { present: 0, absent: 0 }, "Tuesday": { present: 0, absent: 0 }, "Wednesday": { present: 0, absent: 0 }, "Thursday": { present: 0, absent: 0 }, "Friday": { present: 0, absent: 0 } },
            "10:40-12:10": { "Monday": { present: 0, absent: 0 }, "Tuesday": { present: 0, absent: 0 }, "Wednesday": { present: 0, absent: 0 }, "Thursday": { present: 0, absent: 0 }, "Friday": { present: 0, absent: 0 } },
            "13:00-14:30": { "Monday": { present: 0, absent: 0 }, "Tuesday": { present: 0, absent: 0 }, "Wednesday": { present: 0, absent: 0 }, "Thursday": { present: 0, absent: 0 }, "Friday": { present: 0, absent: 0 } },
            "14:40-16:10": { "Monday": { present: 0, absent: 0 }, "Tuesday": { present: 0, absent: 0 }, "Wednesday": { present: 0, absent: 0 }, "Thursday": { present: 0, absent: 0 }, "Friday": { present: 0, absent: 0 } },
            "16:20-17:50": { "Monday": { present: 0, absent: 0 }, "Tuesday": { present: 0, absent: 0 }, "Wednesday": { present: 0, absent: 0 }, "Thursday": { present: 0, absent: 0 }, "Friday": { present: 0, absent: 0 } }
        };
    }
}

function saveAttendanceData() {
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
}

function renderAttendance() {
    const tbody = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; 

    for (const [time, details] of Object.entries(attendanceData)) {
        const row = tbody.insertRow();
        row.insertCell().innerText = time;
        for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]) {
            const cell = row.insertCell();
            const { present, absent } = details[day];

            cell.innerHTML = ` 
                <button class="attendance-button" onclick="toggleAttendance('${time}', '${day}', 'present')">出席: ${present}</button>
                <button class="attendance-button" onclick="toggleAttendance('${time}', '${day}', 'absent')">欠席: ${absent}</button>
                <button class="correction-button" onclick="correctAttendance('${time}', '${day}')">訂正</button>
            `;
        }
    }
}

function toggleAttendance(time, day, type) {
    if (type === 'present') {
        attendanceData[time][day].present++;
    } else {
        attendanceData[time][day].absent++;
    }

    saveAttendanceData();  
    renderAttendance();   
}

function correctAttendance(time, day) {
    const present = prompt("出席回数を訂正してください", attendanceData[time][day].present);
    const absent = prompt("欠席回数を訂正してください", attendanceData[time][day].absent);

    if (present !== null && absent !== null) {
        attendanceData[time][day].present = parseInt(present) || 0;
        attendanceData[time][day].absent = parseInt(absent) || 0;

        saveAttendanceData();  
        renderAttendance();   
    }
}

function goBack() {
    window.location.href = 'a.html';
}

const attendanceData = loadAttendanceData();
renderAttendance();
