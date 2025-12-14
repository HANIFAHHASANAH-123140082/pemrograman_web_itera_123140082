from pertemuan5.library_item import LibraryItem

class Book(LibraryItem):
    """Class untuk item buku."""

    def __init__(self, id, title, author):
        super().__init__(id, title)
        self.__author = author  # private attribute

    def display_info(self):
        status = "Tersedia" if self.is_available() else "Dipinjam"
        print(f"[Book] {self._title} oleh {self.__author} - {status}")
