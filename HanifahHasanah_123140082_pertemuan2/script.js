// script.js

// Deklarasi Variabel (Wajib: let dan const)
const TASK_STORAGE_KEY = 'DASHBOARD_TASK_LIST'; // Kunci localStorage untuk Tugas
const NOTE_STORAGE_KEY = 'DASHBOARD_QUICK_NOTE'; // Kunci localStorage untuk Catatan Cepat
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const dynamicInfo = document.getElementById('dynamic-info');
const quickNoteArea = document.getElementById('quick-note');

let tasks = []; // Array of ToDoItem objects

// =========================================================
// FITUR ES6+ 1: IMPLEMENTASI CLASSES
// =========================================================

/**
 * Kelas untuk merepresentasikan data Tugas (To-Do Item)
 */
class ToDoItem {
    constructor(name, isCompleted = false) {
        this.id = Date.now() + Math.random(); // ID unik
        this.name = name;
        this.isCompleted = isCompleted;
    }
}

// =========================================================
// 1. PENGELOLAAN LOCALSTORAGE & CATATAN
// =========================================================

// FITUR ES6+ 2: Arrow Function 1 (Menyimpan Tugas)
const saveTasks = () => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
};

// Memuat data tugas dari localStorage
const loadTasks = () => {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
    if (storedTasks) {
        // Mengkonversi data kembali menjadi instance Class ToDoItem
        tasks = JSON.parse(storedTasks).map(taskData => new ToDoItem(taskData.name, taskData.isCompleted));
    }
    renderTasks();
};

// Mengelola Catatan Cepat (juga disimpan di localStorage)
quickNoteArea.addEventListener('input', () => {
    localStorage.setItem(NOTE_STORAGE_KEY, quickNoteArea.value);
});

const loadQuickNote = () => {
    const storedNote = localStorage.getItem(NOTE_STORAGE_KEY);
    if (storedNote) {
        quickNoteArea.value = storedNote;
    }
};

// =========================================================
// 2. RENDERING TAMPILAN
// =========================================================

// FITUR ES6+ 3: Arrow Function 2 (Merender Daftar Tugas)
const renderTasks = () => {
    taskList.innerHTML = '';
    
    tasks.forEach((item) => {
        const li = document.createElement('li');
        li.className = item.isCompleted ? 'completed' : '';
        
        // FITUR ES6+ 4: Template Literals untuk markup dinamis
        li.innerHTML = `
            <span onclick="toggleComplete(${item.id})">${item.name}</span>
            <div class="task-actions">
                <button onclick="deleteTask(${item.id})">Hapus</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
};

// =========================================================
// 3. FUNGSI CRUD
// =========================================================

// Menambah Tugas (CREATE)
// FITUR ES6+ 5: Arrow Function 3 (Event Listener Callback)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    
    if (taskName) {
        const newTask = new ToDoItem(taskName);
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = ''; 
    }
});

// Menghapus Tugas (DELETE)
function deleteTask(taskId) {
    // Memfilter array, hanya menyisakan tugas yang ID-nya TIDAK sama dengan taskId
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

// Menandai Selesai (UPDATE)
function toggleComplete(taskId) {
    // Mencari tugas berdasarkan ID
    const taskToToggle = tasks.find(task => task.id === taskId);
    
    if (taskToToggle) {
        taskToToggle.isCompleted = !taskToToggle.isCompleted;
        saveTasks();
        renderTasks();
    }
}


// =========================================================
// 4. FITUR ASINKRON: TAMPILAN WAKTU DINAMIS
// =========================================================

/**
 * FITUR ES6+ 6: Fungsi Asinkron (Async/Await)
 * Mengambil data waktu global secara asinkron dari API publik.
 */
async function fetchDynamicInfo() {
    dynamicInfo.innerHTML = '<p>Mengambil data waktu global...</p>';
    
    try {
        // Menggunakan API worldtimeapi.org
        const API_URL = 'http://worldtimeapi.org/api/ip'; 
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
            throw new Error(`Gagal mengambil data API: Status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Memformat Waktu dan Tanggal
        const dateTime = new Date(data.datetime);
        const timeString = dateTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateString = dateTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // Rendering Waktu dengan Template Literals
        dynamicInfo.innerHTML = `
            <p><strong>🕒 Waktu Saat Ini:</strong></p>
            <p style="font-size: 2.2em; font-weight: bold; margin: 5px 0;">${timeString}</p>
            <p>${dateString}</p>
            <p style="font-size: 0.9em; opacity: 0.8;">Zona Waktu: ${data.timezone}</p>
        `;
        
    } catch (error) {
        console.error("Kesalahan koneksi atau API:", error);
        dynamicInfo.innerHTML = '<p style="color: yellow;">⚠️ Gagal memuat informasi waktu. Silakan coba refresh.</p>';
    }
}

// =========================================================
// INISIALISASI
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Muat data tugas dan catatan yang tersimpan
    loadTasks();
    loadQuickNote();
    
    // 2. Muat waktu global pertama kali
    fetchDynamicInfo();
    
    // 3. Atur agar waktu diperbarui setiap 30 detik
    setInterval(fetchDynamicInfo, 30000); 
});