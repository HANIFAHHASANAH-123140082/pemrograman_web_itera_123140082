<<<<<<< HEAD
# API Manajemen Matakuliah

Aplikasi API sederhana untuk manajemen data matakuliah menggunakan Pyramid Framework dan PostgreSQL.

**Nama:** Hanifah Hasanah  
**NIM:** 123140082  
**Pertemuan:** 6

---

## 📋 Deskripsi Proyek

Aplikasi ini adalah REST API untuk mengelola data matakuliah yang menyediakan operasi CRUD (Create, Read, Update, Delete) lengkap. Dibangun menggunakan:
- **Framework:** Pyramid Framework
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Migration:** Alembic

---

## 🛠️ Instalasi

### Prasyarat
- Python 3.7 atau lebih tinggi
- PostgreSQL 18
- pip (Python package manager)

### Langkah Instalasi

#### 1. Clone atau Download Project
```bash
cd hanifahhasanah_123140082_pertemuan6
```

#### 2. Buat Virtual Environment
```bash
python -m venv venv
```

#### 3. Aktifkan Virtual Environment

**Windows PowerShell:**
```powershell
venv\Scripts\Activate.ps1
```

**Windows CMD:**
```cmd
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

#### 4. Masuk ke Folder Project
```bash
cd matakuliah_api
```

#### 5. Install Dependencies
```bash
pip install -e ".[testing]"
```

#### 6. Konfigurasi Database

Buat database PostgreSQL:
```sql
CREATE DATABASE pyramid_matakuliah;
```

Edit file `development.ini`, cari baris:
```ini
sqlalchemy.url = sqlite:///%(here)s/matakuliah_api.sqlite
```

Ganti dengan (sesuaikan password Anda):
```ini
sqlalchemy.url = postgresql://postgres:password_anda@localhost:1704/pyramid_matakuliah
```

#### 7. Jalankan Migrasi Database
```bash
alembic -c development.ini revision --autogenerate -m "add matakuliah table"
alembic -c development.ini upgrade head
```

---

## 🚀 Cara Menjalankan

### Jalankan Server
```bash
pserve development.ini
```

Server akan berjalan di: `http://localhost:6543`

---

## 📡 API Endpoints

### Base URL
```
http://localhost:6543/api/matakuliah
```

### 1. GET All Matakuliah
Mendapatkan semua data matakuliah.

**Request:**
```bash
curl http://localhost:6543/api/matakuliah
```

**Response:**
```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "IF102",
      "nama_mk": "Struktur Data",
      "sks": 4,
      "semester": 2
    }
  ]
}
```

---

### 2. GET Matakuliah by ID
Mendapatkan detail satu matakuliah berdasarkan ID.

**Request:**
```bash
curl http://localhost:6543/api/matakuliah/1
```

**Response Success:**
```json
{
  "id": 1,
  "kode_mk": "IF101",
  "nama_mk": "Algoritma dan Pemrograman",
  "sks": 3,
  "semester": 1
}
```

**Response Error (Not Found):**
```json
{
  "error": "Matakuliah not found"
}
```

---

### 3. POST - Create Matakuliah
Menambahkan matakuliah baru.

**Request (PowerShell):**
```powershell
$json = '{"kode_mk": "IF101", "nama_mk": "Algoritma dan Pemrograman", "sks": 3, "semester": 1}'
Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah -Method POST -ContentType "application/json" -Body $json -UseBasicParsing
```

**Request (curl):**
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk": "IF101", "nama_mk": "Algoritma dan Pemrograman", "sks": 3, "semester": 1}'
```

**Response Success:**
```json
{
  "message": "Matakuliah created successfully",
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }
}
```

**Response Error (Duplicate Kode MK):**
```json
{
  "error": "Kode MK already exists"
}
```

---

### 4. PUT - Update Matakuliah
Mengupdate data matakuliah berdasarkan ID.

**Request (PowerShell):**
```powershell
$json = '{"sks": 4, "semester": 2}'
Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah/1 -Method PUT -ContentType "application/json" -Body $json -UseBasicParsing
```

**Request (curl):**
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{"sks": 4, "semester": 2}'
```

**Response Success:**
```json
{
  "message": "Matakuliah updated successfully",
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 4,
    "semester": 2
  }
}
```

**Response Error (Not Found):**
```json
{
  "error": "Matakuliah not found"
}
```

---

### 5. DELETE - Hapus Matakuliah
Menghapus matakuliah berdasarkan ID.

**Request (PowerShell):**
```powershell
Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah/1 -Method DELETE -UseBasicParsing
```

**Request (curl):**
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

**Response Success:**
```json
{
  "message": "Matakuliah deleted successfully"
}
```

**Response Error (Not Found):**
```json
{
  "error": "Matakuliah not found"
}
```

---

## 🧪 Testing

### Testing Lengkap dengan PowerShell

Jalankan script testing ini untuk menguji semua endpoint:

```powershell
# Test 1: GET All (awal kosong)
Write-Host "`n=== Test 1: GET All ===" -ForegroundColor Green
curl.exe http://localhost:6543/api/matakuliah

# Test 2: POST Data 1
Write-Host "`n=== Test 2: POST Data 1 ===" -ForegroundColor Green
$json1 = '{"kode_mk": "IF101", "nama_mk": "Algoritma dan Pemrograman", "sks": 3, "semester": 1}'
(Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah -Method POST -ContentType "application/json" -Body $json1 -UseBasicParsing).Content

# Test 3: POST Data 2
Write-Host "`n=== Test 3: POST Data 2 ===" -ForegroundColor Green
$json2 = '{"kode_mk": "IF102", "nama_mk": "Struktur Data", "sks": 4, "semester": 2}'
(Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah -Method POST -ContentType "application/json" -Body $json2 -UseBasicParsing).Content

# Test 4: POST Data 3
Write-Host "`n=== Test 4: POST Data 3 ===" -ForegroundColor Green
$json3 = '{"kode_mk": "IF201", "nama_mk": "Basis Data", "sks": 3, "semester": 3}'
(Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah -Method POST -ContentType "application/json" -Body $json3 -UseBasicParsing).Content

# Test 5: GET All (harus ada 3 data)
Write-Host "`n=== Test 5: GET All ===" -ForegroundColor Green
curl.exe http://localhost:6543/api/matakuliah

# Test 6: GET Detail
Write-Host "`n=== Test 6: GET Detail ===" -ForegroundColor Green
curl.exe http://localhost:6543/api/matakuliah/1

# Test 7: UPDATE
Write-Host "`n=== Test 7: UPDATE ===" -ForegroundColor Green
$jsonUpdate = '{"sks": 4}'
(Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah/1 -Method PUT -ContentType "application/json" -Body $jsonUpdate -UseBasicParsing).Content

# Test 8: GET Detail (lihat perubahan)
Write-Host "`n=== Test 8: GET Detail setelah UPDATE ===" -ForegroundColor Green
curl.exe http://localhost:6543/api/matakuliah/1

# Test 9: DELETE
Write-Host "`n=== Test 9: DELETE ===" -ForegroundColor Green
(Invoke-WebRequest -Uri http://localhost:6543/api/matakuliah/3 -Method DELETE -UseBasicParsing).Content

# Test 10: GET All (data ke-3 harus hilang)
Write-Host "`n=== Test 10: GET All setelah DELETE ===" -ForegroundColor Green
curl.exe http://localhost:6543/api/matakuliah
```

### Hasil Testing yang Diharapkan

✅ **POST:** Berhasil menambahkan 3 data matakuliah  
✅ **GET All:** Menampilkan semua data  
✅ **GET Detail:** Menampilkan detail satu data  
✅ **UPDATE:** SKS berubah dari 3 menjadi 4  
✅ **DELETE:** Data berhasil dihapus  
✅ **Error Handling:** Kode MK duplicate dan ID tidak ditemukan ditangani dengan baik

---

## 📊 Database Schema

### Tabel: matakuliah

| Column    | Type    | Constraint           |
|-----------|---------|----------------------|
| id        | Integer | Primary Key, Auto Increment |
| kode_mk   | Text    | Unique, Not Null     |
| nama_mk   | Text    | Not Null             |
| sks       | Integer | Not Null             |
| semester  | Integer | Not Null             |

---

## 📁 Struktur Project

```
hanifahhasanah_123140082_pertemuan6/
├── matakuliah_api/
│   ├── models/
│   │   ├── __init__.py          # Import semua models
│   │   ├── meta.py              # Base model
│   │   ├── mymodel.py           # Contoh model
│   │   └── matakuliah.py        # Model Matakuliah
│   ├── views/
│   │   ├── default.py           # Default views
│   │   └── matakuliah.py        # Views CRUD Matakuliah
│   ├── routes.py                # Konfigurasi routing
│   ├── __init__.py              # App configuration
│   └── development.ini          # Config file
├── alembic/                     # Folder migrasi database
├── venv/                        # Virtual environment
└── README.md                    # Dokumentasi ini
```

---

## 🔧 Troubleshooting

### Error: "Connection refused"
**Solusi:** Pastikan PostgreSQL service sudah running
```bash
# Windows
net start postgresql-x64-18

# Atau via services.msc
```

### Error: "psql is not recognized"
**Solusi:** Tambahkan PostgreSQL ke PATH atau gunakan full path
```bash
cd "C:\Program Files\PostgreSQL\18\bin"
.\psql -U postgres -p 1704
```

### Error: "Kode MK already exists"
**Solusi:** Gunakan kode_mk yang unik atau hapus data lama terlebih dahulu

---

## 👤 Author

**Hanifah Hasanah**  
NIM: 123140082  
Praktikum Pemrograman Aplikasi Web - Pertemuan 6

---

## 📅 Informasi Pengumpulan

- **Deadline:** 15 Mei 2025, 23:59 WIB
- **Repository:** `pemrograman_web_itera_123140082`
- **Folder:** `hanifahhasanah_123140082_pertemuan6`

---

## 📝 Lisensi

Project ini dibuat untuk keperluan praktikum Pemrograman Aplikasi Web.
=======
# pemrograman_web_itera_123140082
TUGAS PRAKTIKUM PEMROGRAMAN APLIKASI WEB (RA)
>>>>>>> adc5bcbcb5322a49a785b11b1249302833414ced
