from pertemuan5.library import Library
from pertemuan5.book import Book
from pertemuan5.magazine import Magazine

def main():
    library = Library()

    # Tambahkan beberapa item
    b1 = Book(1, "Laskar Pelangi", "Andrea Hirata")
    b2 = Book(2, "Negeri 5 Menara", "Ahmad Fuadi")
    m1 = Magazine(3, "National Geographic", "Edisi 2025")

    # Tambahkan ke perpustakaan
    library.add_item(b1)
    library.add_item(b2)
    library.add_item(m1)

    # Tampilkan koleksi
    library.show_items()

    # Lakukan checkout & checkin
    print("\n--- Simulasi Checkout & Checkin ---")
    b1.checkout()
    library.show_items()
    b1.checkin()
    library.show_items()

    # Cari item
    library.search_item("Pelangi")

if __name__ == "__main__":
    main()
