document.addEventListener("DOMContentLoaded", function() {
    // Search functionality
    document.getElementById("chatSearch").addEventListener("input", function() {
        let searchText = this.value.toLowerCase();
        let chatItems = document.querySelectorAll(".chat-item");

        chatItems.forEach(item => {
            let text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchText) ? "flex" : "none";
        });
    });

    // Dropdown functionality
    document.querySelector(".dropdown-toggle").addEventListener("click", function() {
        let chatContainer = document.querySelector(".message-list");
        chatContainer.classList.toggle("hidden");
    });
});
