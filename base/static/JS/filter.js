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
  const clearFilter = document.getElementById("clearFilter");

  let currentFilterType = "";
  let currentFilterValue = "";

  function filterProjects() {
    const searchText = searchInput.value.trim().toLowerCase();
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
      const title = card.dataset.title || "";
      const subtitle = card.dataset.subtitle || "";
      const tech = card.dataset.tech || "";
      const category = card.dataset.category || "";
      const status = card.dataset.status || "";

      const matchesSearch =
          title.includes(searchText) ||
          subtitle.includes(searchText) ||
          tech.includes(searchText);

      let matchesFilter = true;
      if (currentFilterType && currentFilterValue) {
        if (currentFilterType === "category") {
          matchesFilter = category === currentFilterValue;
        } else if (currentFilterType === "status") {
          matchesFilter = status === currentFilterValue;
        } else if (currentFilterType === "tech") {
          matchesFilter = tech.includes(currentFilterValue);
        }
      }

      if (matchesSearch && matchesFilter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Handle search input
  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
  }

  // Toggle filter menu
  if (filterIcon && filterMenu) {
    filterIcon.addEventListener("click", () => {
      filterMenu.style.display = (filterMenu.style.display === "none" || filterMenu.style.display === "") ? "block" : "none";
    });

    document.addEventListener("click", (e) => {
      if (!filterMenu.contains(e.target) && e.target !== filterIcon) {
        filterMenu.style.display = "none";
      }
    });

    filterMenu.addEventListener("click", function (e) {
      const filterType = e.target.dataset.filterType;
      if (!filterType) return;

      currentFilterType = filterType;
      popupInput.style.display = "none";
      popupSelect.style.display = "none";

      if (filterType === "category" || filterType === "status") {
        filterLabel.textContent = `Select ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}:`;
        popupSelect.style.display = "block";
        popupSelect.value = "";
      } else {
        filterLabel.textContent = `Enter ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}:`;
        popupInput.style.display = "block";
        popupInput.value = "";
      }

      popup.style.display = "block";
      filterMenu.style.display = "none";
    });

    applyBtn.addEventListener("click", () => {
      if (currentFilterType === "category" || currentFilterType === "status") {
        currentFilterValue = popupSelect.value.trim().toLowerCase();
      } else {
        currentFilterValue = popupInput.value.trim().toLowerCase();
      }

      filterProjects();
      popup.style.display = "none";
    });

    if (clearFilter) {
      clearFilter.addEventListener("click", () => {
        currentFilterType = "";
        currentFilterValue = "";
        filterProjects();
      });
    }

    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        popup.style.display = "none";
      }
    });
  }
});
