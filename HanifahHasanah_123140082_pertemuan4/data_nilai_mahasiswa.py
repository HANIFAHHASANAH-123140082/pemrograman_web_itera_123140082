# Nama: Hanifah Hasanah
# NIM : 123140082
# Program: Pengelolaan Data Nilai Mahasiswa

# Data awal mahasiswa (berisi 5 data)
mahasiswa = [
    {"nama": "Alya", "nim": "123140001", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 78},
    {"nama": "Rafi", "nim": "123140002", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 68},
    {"nama": "Nina", "nim": "123140003", "nilai_uts": 88, "nilai_uas": 92, "nilai_tugas": 90},
    {"nama": "Fahri", "nim": "123140004", "nilai_uts": 60, "nilai_uas": 55, "nilai_tugas": 70},
    {"nama": "Tari", "nim": "123140005", "nilai_uts": 77, "nilai_uas": 73, "nilai_tugas": 80},
]

# Fungsi menghitung nilai akhir
def hitung_nilai_akhir(uts, uas, tugas):
    return round((uts * 0.3) + (uas * 0.4) + (tugas * 0.3), 2)

# Fungsi menentukan grade
def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

# Fungsi menampilkan data mahasiswa dalam tabel
def tampilkan_data():
    print("="*68)
    print(f"{'NAMA':<15}{'NIM':<12}{'UTS':<8}{'UAS':<8}{'TUGAS':<8}{'AKHIR':<10}{'GRADE'}")
    print("="*68)
    for mhs in mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        grade = tentukan_grade(nilai_akhir)
        print(f"{mhs['nama']:<15}{mhs['nim']:<12}{mhs['nilai_uts']:<8}{mhs['nilai_uas']:<8}{mhs['nilai_tugas']:<8}{nilai_akhir:<10}{grade}")
    print("="*68)

# Fungsi menambah data mahasiswa baru
def tambah_mahasiswa():
    nama = input("Masukkan nama mahasiswa: ")
    nim = input("Masukkan NIM: ")
    uts = float(input("Masukkan nilai UTS: "))
    uas = float(input("Masukkan nilai UAS: "))
    tugas = float(input("Masukkan nilai Tugas: "))
    mahasiswa.append({
        "nama": nama,
        "nim": nim,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    })
    print("✅ Data berhasil ditambahkan!")

# Fungsi mencari nilai tertinggi & terendah
def cari_nilai_extreme():
    nilai_akhir_list = [(mhs["nama"], hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])) for mhs in mahasiswa]
    tertinggi = max(nilai_akhir_list, key=lambda x: x[1])
    terendah = min(nilai_akhir_list, key=lambda x: x[1])
    print(f"🔹 Nilai tertinggi: {tertinggi[0]} ({tertinggi[1]})")
    print(f"🔸 Nilai terendah: {terendah[0]} ({terendah[1]})")

# Fungsi filter berdasarkan grade
def filter_grade():
    target = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
    hasil = []
    for mhs in mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        if tentukan_grade(nilai_akhir) == target:
            hasil.append(mhs["nama"])
    if hasil:
        print(f"Mahasiswa dengan grade {target}: {', '.join(hasil)}")
    else:
        print(f"Tidak ada mahasiswa dengan grade {target}")

# Fungsi menghitung rata-rata kelas
def rata_rata_kelas():
    total = sum([hitung_nilai_akhir(m["nilai_uts"], m["nilai_uas"], m["nilai_tugas"]) for m in mahasiswa])
    print(f"📊 Rata-rata nilai kelas: {round(total / len(mahasiswa), 2)}")

# Program utama (menu)
while True:
    print("\n=== PROGRAM PENGELOLAAN DATA NILAI MAHASISWA ===")
    print("1. Tampilkan Data")
    print("2. Tambah Mahasiswa")
    print("3. Cari Nilai Tertinggi & Terendah")
    print("4. Filter Berdasarkan Grade")
    print("5. Hitung Rata-rata Kelas")
    print("6. Keluar")
    pilihan = input("Pilih menu (1-6): ")

    if pilihan == "1":
        tampilkan_data()
    elif pilihan == "2":
        tambah_mahasiswa()
    elif pilihan == "3":
        cari_nilai_extreme()
    elif pilihan == "4":
        filter_grade()
    elif pilihan == "5":
        rata_rata_kelas()
    elif pilihan == "6":
        print("Terima kasih! Program selesai.")
        break
    else:
        print("⚠️ Pilihan tidak valid, silakan coba lagi.")
