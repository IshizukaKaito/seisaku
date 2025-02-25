function loadTimetableData() {
    const savedData = localStorage.getItem('timetableData');
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        return {
            "9:00-10:30": { "Monday": { subject: "", room: "", attendance: "" }, "Tuesday": { subject: "", room: "", attendance: "" }, "Wednesday": { subject: "", room: "", attendance: "" }, "Thursday": { subject: "", room: "", attendance: "" }, "Friday": { subject: "", room: "", attendance: "" } },
            "10:40-12:10": { "Monday": { subject: "", room: "", attendance: "" }, "Tuesday": { subject: "", room: "", attendance: "" }, "Wednesday": { subject: "", room: "", attendance: "" }, "Thursday": { subject: "", room: "", attendance: "" }, "Friday": { subject: "", room: "", attendance: "" } },
            "12:10-13:00": { "Monday": { subject: "", room: "", attendance: "" }, "Tuesday": { subject: "", room: "", attendance: "" }, "Wednesday": { subject: "", room: "", attendance: "" }, "Thursday": { subject: "", room: "", attendance: "" }, "Friday": { subject: "", room: "", attendance: "" } },
            "13:00-14:30": { "Monday": { subject: "", room: "", attendance: "" }, "Tuesday": { subject: "", room: "", attendance: "" }, "Wednesday": { subject: "", room: "", attendance: "" }, "Thursday": { subject: "", room: "", attendance: "" }, "Friday": { subject: "", room: "", attendance: "" } },
            "14:40-16:10": { "Monday": { subject: "", room: "", attendance: "" }, "Tuesday": { subject: "", room: "", attendance: "" }, "Wednesday": { subject: "", room: "", attendance: "" }, "Thursday": { subject: "", room: "", attendance: "" }, "Friday": { subject: "", room: "", attendance: "" } },
            "16:20-17:50": { "Monday": { subject: "", room: "", attendance: "" }, "Tuesday": { subject: "", room: "", attendance: "" }, "Wednesday": { subject: "", room: "", attendance: "" }, "Thursday": { subject: "", room: "", attendance: "" }, "Friday": { subject: "", room: "", attendance: "" } }
        };
    }
}

function saveTimetableData() {
    localStorage.setItem('timetableData', JSON.stringify(timetableData));
}

function renderTimetable() {
    const tbody = document.getElementById('timetable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for (const [time, details] of Object.entries(timetableData)) {
        const row = tbody.insertRow();
        row.insertCell().innerText = time;
        for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]) {
            const cell = row.insertCell();
            const { subject, room } = details[day];
            const subjectContent = subject || ''; // 科目名が空なら空文字
            const roomContent = room || ''; // 教室番号が空なら空文字
            // 科目名と教室番号の両方が空ならセルも空にする
            if (!subjectContent && !roomContent) {
                cell.innerHTML = ''; // 空のセル
            } else {
                // 科目名と教室番号があれば、それらを表示
                cell.innerHTML = `<div class="timetable-cell"><a href="c.html?subject=${encodeURIComponent(subjectContent)}"><strong>${subjectContent}</strong></a><br><span>${roomContent}</span></div>`;
            }
        }

        const attendanceCell = row.insertCell();
        attendanceCell.innerHTML = `<button class="attendance-button" onclick="goToAttendance()">登録</button>`;
    }
}


function goToAttendance() {
    window.location.href = 'b.html';
}

document.getElementById('time').addEventListener('change', function () {
    const time = this.value;
    const subjectField = document.getElementById('subject');
    const roomField = document.getElementById('room');

    // 12:10-13:00の場合、科目名を無効にし、教室番号を有効にする
    if (time === "12:10-13:00") {
        subjectField.disabled = true;   // 科目名を無効にする
        subjectField.value = "";       // 科目名の入力をリセット
        roomField.disabled = false;    // 教室番号を有効にする
    } else {
        subjectField.disabled = false; // 科目名を有効にする
        roomField.disabled = false;    // 教室番号を有効にする
    }
});

document.getElementById('timetable-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const time = document.getElementById('time').value;
    const day = document.getElementById('day').value;
    const subject = document.getElementById('subject').value;
    const room = document.getElementById('room').value;

    // 12:10-13:00 の時間帯なら、科目名の入力を必須にしない
    if (time && day && (time === "12:10-13:00" || subject) && room) {
        timetableData[time][day].subject = subject;
        timetableData[time][day].room = room;
        saveTimetableData();
        renderTimetable();
    } else {
        alert('すべての項目を入力してください。');
    }

    document.getElementById('timetable-form').reset();
});

const timetableData = loadTimetableData();
renderTimetable();
