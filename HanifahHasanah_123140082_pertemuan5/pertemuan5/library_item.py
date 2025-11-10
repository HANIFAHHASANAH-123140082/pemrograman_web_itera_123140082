from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """Abstract class untuk item perpustakaan."""

    def __init__(self, id, title):
        self._id = id
        self._title = title
        self._available = True

    @property
    def title(self):
        return self._title

    @abstractmethod
    def display_info(self):
        pass

    def checkout(self):
        if self._available:
            self._available = False
            print(f"Item '{self._title}' berhasil dipinjam.")
        else:
            print(f"Item '{self._title}' sedang tidak tersedia.")

    def checkin(self):
        self._available = True
        print(f"Item '{self._title}' telah dikembalikan.")

    def is_available(self):
        return self._available
