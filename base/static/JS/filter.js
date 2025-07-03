//---------- Methods for the search and filter ----------//
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const filterIcon = document.getElementById("filterIcon");
  const filterMenu = document.getElementById("filterMenu");
  const popup = document.getElementById("filterPopup");
  const popupInput = document.getElementById("popupInput");
  const popupSelect = document.getElementById("popupSelect");
  const applyBtn = document.getElementById("applyFilter");
  const filterLabel = document.getElementById("filterLabel");
  const closePopup = document.getElementById("closePopup");

  let currentFilterType = "";

  // Load books initially
  loadBooks();

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      loadBooks(this.value.trim());
    });
  }

   // Toggle filter menu
  if (filterIcon && filterMenu) {
    filterIcon.addEventListener("click", () => {
      filterMenu.style.display = (filterMenu.style.display === "none" || filterMenu.style.display === "") ? "block" : "none";
    });

	// Close filter menu on outside click
    const filter = document.querySelector(".filter");
    document.addEventListener('click', (e) => {
      if (!filter.contains(e.target) && !filterMenu.contains(e.target)) {
        filterMenu.style.display = "none";
      }
    });

	// Handle filter option click
    filterMenu.addEventListener("click", function (e) {
      const filterType = e.target.dataset.filterType;
      if (!filterType) return;

      currentFilterType = filterType;
      popupInput.style.display = "none";
      popupSelect.style.display = "none";

      if (filterType === "availability") {
        filterLabel.textContent = "Select Availability:";
        popupSelect.style.display = "block";
        popupSelect.value = "";
      } else {
        const cap = filterType.charAt(0).toUpperCase() + filterType.slice(1);
        filterLabel.textContent = `Enter ${cap}:`;
        popupInput.style.display = "block";
        popupInput.value = "";
      }

      popup.style.display = "block";
      filterMenu.style.display = "none";
    });

	 // Apply filter from modal
    applyBtn.addEventListener("click", () => {
      let value = "";
      if (currentFilterType === "availability") {
        value = popupSelect.value;
      } else {
        value = popupInput.value.trim().toLowerCase();
      }

      if (value) {
        loadBooks("", currentFilterType, value);
      }
      popup.style.display = "none";
    });

    // Clear filter
    const clearFilterDiv = document.getElementById("clearFilter");

    if (clearFilterDiv) {
      clearFilterDiv.addEventListener("click", () => {
        loadBooks(); // Reload all books with no filters
      });
    }

    // Close modal via X
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });

    // Close modal with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        popup.style.display = "none";
      }
    });
  }
});



function loadBooks(searchText = "", filterType = "", filterValue = "") {
  const bookContainer = document.querySelector(".books");

  fetch("/api/books/")
    .then(response => response.json())
    .then(books => {
      bookContainer.innerHTML = "";
      if (books.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No books have been added yet.";
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.padding = "20px";
        bookContainer.appendChild(emptyMessage);
        return;
      }

      const filteredBooks = books.filter(book => {
        const matchesSearch = (
          book.title.toLowerCase().includes(searchText.toLowerCase()) ||
          book.author.toLowerCase().includes(searchText.toLowerCase()) ||
          book.category.toLowerCase().includes(searchText.toLowerCase())
        );
        let matchesFilter = true;
        if (filterType === "category") {
          matchesFilter = book.category.toLowerCase() === filterValue;
        } else if (filterType === "author") {
          matchesFilter = book.author.toLowerCase() === filterValue;
        } else if (filterType === "availability") {
          const status = book.available ? "available" : "borrowed";
          matchesFilter = status === filterValue;
        }
        return matchesSearch && matchesFilter;
      });

      const userJson = localStorage.getItem("user");
      let role = null;
      try {
        role = userJson ? JSON.parse(userJson).role : null;
      } catch (e) {
        console.warn("Invalid user object in localStorage");
      }

      filteredBooks.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const previewUrl = role === "admin"? `/add_book/preview/${book.id}/`: `/books/preview/${book.id}/`;


        const cardHTML = `
          <img src="${book.cover}" alt="Book Cover" class="book-img">
          <a href="${previewUrl}" class="book-overlay">
            <div class="book-header">
              <div class="left">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
              </div>
              <div class="right">
                <span class="status ${book.available ? "available" : "borrowed"}">${book.available ? "Available" : "Borrowed"}</span>
                <span class="category"><i class='bx bx-purchase-tag'></i>${book.category}</span>
              </div>
            </div>
            <p class="description">Description: ${book.description.slice(0, 100)}${book.description.length > 100 ? "..." : ""}</p>
          </a>`;

        card.innerHTML = cardHTML;
        bookContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading books from server:", err));
}

//--------------------//