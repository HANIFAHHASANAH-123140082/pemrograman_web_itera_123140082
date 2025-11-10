from pertemuan5.library_item import LibraryItem

class Magazine(LibraryItem):
    """Class untuk item majalah."""

    def __init__(self, id, title, issue):
        super().__init__(id, title)
        self._issue = issue  # protected attribute

    def display_info(self):
        status = "Tersedia" if self.is_available() else "Dipinjam"
        print(f"[Magazine] {self._title} - Edisi {self._issue} - {status}")
