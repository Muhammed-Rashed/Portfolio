document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    // For demo purposes, we'll use a simple variable instead of localStorage
    // In your actual implementation, you can use localStorage
    let currentTheme = "light"; // Default theme

    // Apply initial theme
    document.body.classList.add(`${currentTheme}-mode`);
    updateThemeIcon(currentTheme);

    // Theme toggle event listener
    toggleButton.addEventListener("click", () => {
        if (document.body.classList.contains("light-mode")) {
            // Switch to dark mode
            document.body.classList.replace("light-mode", "dark-mode");
            currentTheme = "dark";
            updateThemeIcon("dark");
        } else {
            // Switch to light mode
            document.body.classList.replace("dark-mode", "light-mode");
            currentTheme = "light";
            updateThemeIcon("light");
        }

        // In your actual implementation, you would save to localStorage here:
        // localStorage.setItem("theme", currentTheme);

        console.log(`Theme switched to: ${currentTheme}`);
    });

    // Helper function to update theme icon
    function updateThemeIcon(theme) {
        if (theme === "dark") {
            themeIcon.className = "ri-sun-line"; // Show sun icon in dark mode
        } else {
            themeIcon.className = "ri-moon-line"; // Show moon icon in light mode
        }
    }

    // Add some visual feedback for the toggle
    toggleButton.addEventListener("mouseenter", () => {
        themeIcon.style.transform = "scale(1.2) rotate(15deg)";
    });

    toggleButton.addEventListener("mouseleave", () => {
        themeIcon.style.transform = "scale(1) rotate(0deg)";
    });
});

// Optional: Add keyboard support
document.addEventListener("keydown", function(event) {
    // Toggle theme with Ctrl/Cmd + Shift + T
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault();
        document.getElementById("theme-toggle").click();
    }
});