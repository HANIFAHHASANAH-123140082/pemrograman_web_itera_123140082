class Library:
    """Class untuk mengelola koleksi perpustakaan."""

    def __init__(self):
        self._items = []  # protected list

    def add_item(self, item):
        self._items.append(item)
        print(f"Item '{item.title}' berhasil ditambahkan ke perpustakaan.")

    def show_items(self):
        print("\n--- Daftar Koleksi Perpustakaan ---")
        if not self._items:
            print("Belum ada koleksi.")
        for item in self._items:
            item.display_info()

    def search_item(self, keyword):
        print(f"\nHasil pencarian untuk '{keyword}':")
        found = False
        for item in self._items:
            if keyword.lower() in item.title.lower():
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan.")
