// Variabel Global
let tasks = []; 
const TASK_STORAGE_KEY = 'tasks';

// DOM Elements
const taskList = document.getElementById('task-list');
const pendingCountSpan = document.getElementById('pending-count');
const form = document.getElementById('add-task-form');
const filterStatus = document.getElementById('filter-status');
const searchCourse = document.getElementById('search-course');


/**
 * 1. PENGELOLAAN LOCALSTORAGE
 */

// Menyimpan array tugas ke localStorage
function saveTasks() {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}

// Memuat array tugas dari localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks(); 
}

/**
 * 2. TAMPILAN (RENDER) - Termasuk Filter dan Pencarian
 */

function renderTasks() {
    taskList.innerHTML = ''; 
    let pendingTasksCount = 0;

    // Ambil nilai filter dan pencarian saat ini
    const currentStatusFilter = filterStatus.value;
    const currentSearchTerm = searchCourse.value.toLowerCase();

    // 1. Filtering dan Counting
    tasks.forEach((task, index) => {
        
        // Cek status filter
        const statusMatch = currentStatusFilter === 'all' || 
                           (currentStatusFilter === 'completed' && task.isCompleted) || 
                           (currentStatusFilter === 'pending' && !task.isCompleted);
        
        // Cek pencarian mata kuliah
        const searchMatch = task.course.toLowerCase().includes(currentSearchTerm);

        if (statusMatch && searchMatch) {
            // Hitung tugas yang belum selesai
            if (!task.isCompleted) {
                pendingTasksCount++;
            }

            // 2. Pembuatan Elemen UI
            const li = document.createElement('li');
            li.className = task.isCompleted ? 'completed' : '';
            li.innerHTML = `
                <div class="task-info">
                    <strong>${task.name}</strong> (${task.course})<br>
                    Deadline: ${task.deadline}
                </div>
                <div class="task-actions">
                    <button onclick="toggleComplete(${index})" class="${task.isCompleted ? 'btn-uncomplete' : 'btn-complete'}">
                        ${task.isCompleted ? 'Batal Selesai' : 'Selesai'}
                    </button>
                    <button onclick="deleteTask(${index})" class="btn-delete">Hapus</button>
                </div>
            `;
            taskList.appendChild(li);
        }
    });

    // 3. Update Statistik
    pendingCountSpan.textContent = pendingTasksCount;
}

/**
 * 3. VALIDASI FORM DAN TAMBAH TUGAS (CREATE)
 */

function validateForm(name, deadline) {
    let isValid = true;

    // Validasi Nama Tugas (Tidak boleh kosong)
    const nameError = document.getElementById('name-error');
    if (name.trim() === "") {
        nameError.textContent = "Nama tugas tidak boleh kosong.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Validasi Deadline (Tanggal harus valid dan bukan masa lalu)
    const deadlineError = document.getElementById('deadline-error');
    const deadlineDate = new Date(deadline);
    const today = new Date();
    // Atur jam ke 00:00:00 untuk perbandingan tanggal saja
    today.setHours(0, 0, 0, 0); 

    if (deadline.trim() === "") {
        deadlineError.textContent = "Deadline harus diisi.";
        isValid = false;
    } else if (deadlineDate < today) {
        deadlineError.textContent = "Deadline tidak boleh tanggal yang sudah lewat.";
        isValid = false;
    } else {
        deadlineError.textContent = "";
    }

    return isValid;
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form di-submit ke server

    const name = document.getElementById('task-name').value;
    const course = document.getElementById('task-course').value;
    const deadline = document.getElementById('task-deadline').value;

    if (validateForm(name, deadline)) {
        // Jika valid, tambahkan tugas
        const newTask = {
            id: Date.now(), // ID unik
            name: name,
            course: course,
            deadline: deadline,
            isCompleted: false
        };
        tasks.push(newTask);
        saveTasks(); // Simpan ke localStorage
        renderTasks(); // Perbarui tampilan

        // Reset form
        form.reset();
    }
});


/**
 * 4. FUNGSI INTERAKTIF (UPDATE & DELETE)
 */

// Menandai tugas sebagai selesai/belum selesai (Update Status)
function toggleComplete(index) {
    tasks[index].isCompleted = !tasks[index].isCompleted;
    saveTasks();
    renderTasks();
}

// Menghapus tugas (Delete)
function deleteTask(index) {
    if (confirm('Yakin ingin menghapus tugas ini?')) {
        tasks.splice(index, 1); 
        saveTasks();
        renderTasks();
    }
}


/**
 * 5. FITUR FILTER DAN PENCARIAN (Event Listeners)
 */

filterStatus.addEventListener('change', renderTasks);
searchCourse.addEventListener('input', renderTasks);


/**
 * INISIALISASI APLIKASI
 */
loadTasks(); // MUAT DATA PERTAMA KALI