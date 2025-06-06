function navigateTo(pageId) {
    const allPages = ['home', 'messages'];
    const pageTitle = {
        home: 'Home',
        messages: 'Messages'
    };

    // Hide all pages
    allPages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // Show the requested page
    const target = document.getElementById(pageId);
    if (target) target.style.display = 'block';

    // Set the page title
    const titleEl = document.getElementById('title');
    if (titleEl) titleEl.textContent = pageTitle[pageId] || 'Page';
}




/*MESSAGES PAGE*/
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

document.addEventListener('DOMContentLoaded', () => {
    // Simulated backend chat data
    const chatItems = [
        {
            badgeColor: 'red',
            title: 'Class 101 - Professor Smith',
            message: 'Don’t forget the quiz tomorrow!',
            time: 'Today | 11:00 AM'
        },
        {
            badgeColor: 'purple',
            title: 'Class 102 - TA Johnson',
            message: 'Graded Assignment 3 is out.',
            time: 'Today | 09:30 AM'
        },
        {
            badgeColor: 'yellow',
            title: 'Academic Advisor - Ms. Green',
            message: 'Your appointment is confirmed.',
            time: 'Yesterday | 04:15 PM'
        },
        
    ];

    const chatList = document.getElementById('chatList');
    chatList.innerHTML = '';
    chatItems.forEach(item => {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');

        chatItem.innerHTML = `
            <div class="chat-badge ${item.badgeColor}"></div>
            <div class="chat-details">
                <p class="chat-title">${item.title}</p>
                <p class="chat-message">${item.message}</p>
                <p class="chat-time">${item.time}</p>
            </div>
        `;
        chatItem.addEventListener('click', () => {
            document.getElementById('activeChatName').textContent = item.title;

            const badge = document.getElementById('activeChatBadge');
            badge.className = 'chat-badge'; // Reset any previous class
            badge.classList.add(item.badgeColor); // Add new badge color
            document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
            chatItem.classList.add('active');
        });
        

        chatList.appendChild(chatItem);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messageContainer = document.getElementById('messageContainer');

    function addMessage(content, type) {
        const message = document.createElement('div');
        message.classList.add('message', type); // type is 'sent' or 'received'
        message.textContent = content;
        messageContainer.appendChild(message);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    sendButton.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (text !== '') {
            addMessage(text, 'sent'); // local echo
            messageInput.value = '';

            // 🔗 Send to AWS backend here
            sendMessageToAWS(text);
        }
    });

    // Optional: send on Enter key
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendButton.click();
    });

    function sendMessageToAWS(text) {
        // 🔧 Replace with your actual AWS API call (e.g. API Gateway + Lambda or AppSync)
        fetch('https://your-api.amazonaws.com/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, user: 'your_user_id' })
        })
        .then(res => res.json())
        .then(data => {
            if (data.reply) {
                addMessage(data.reply, 'received');
            }
        })
        .catch(err => {
            console.error('Error sending to backend:', err);
        });
    }
});


/** ===============  HOME PAGE ================= **/
document.addEventListener("DOMContentLoaded", () => {
    // creating the menu for renaming or leaving the group
    const menu = document.createElement("div");
    menu.id = "custom-menu";
    menu.style.position = "absolute";
    menu.style.background = "#fff";
    menu.style.border = "1px solid #ccc";
    menu.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    menu.style.padding = "10px";
    menu.style.display = "none";
    menu.style.zIndex = "1000";
    menu.innerHTML = `
        <div class="menu-option" data-action="rename" style="padding: 5px; cursor: pointer;">Rename Group</div>
        <div class="menu-option" data-action="leave" style="padding: 5px; cursor: pointer;">Leave Group</div>
    `;
    document.body.appendChild(menu);

    let currentBox = null;

    // showing the menu when clicking the three dots img in existing groups
    document.querySelectorAll(".box-align img:last-child").forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.stopPropagation();
            currentBox = dot.closest(".box");
            const { clientX: mouseX, clientY: mouseY } = e;

            // getting dimensions of the menu
            const menuWidth = menu.offsetWidth;
            const menuHeight = menu.offsetHeight;

            // getting dimensions of the viewport
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // adjust position to avoid overflow
            let finalX = mouseX;
            let finalY = mouseY;

            // menu overflows at the right, adjust its position to the left
            if (mouseX + menuWidth > viewportWidth) {
                finalX = viewportWidth - menuWidth - 10; // 10px padding from the edge
            }

            // menu overflows at bottom, adjust its position to the top
            if (mouseY + menuHeight > viewportHeight) {
                finalY = viewportHeight - menuHeight - 10; // 10px padding from the edge
            }

            menu.style.left = `${finalX}px`;
            menu.style.top = `${finalY}px`;
            menu.style.display = "block";
        });
    });

    // handle menu actions (rename or delete)
    menu.addEventListener("click", (e) => {
        if (!currentBox) return;
        const action = e.target.getAttribute("data-action");
        if (action === "rename") {
            const label = currentBox.querySelector(".box-label");
            const newName = prompt("Enter new group name:", label.textContent);
            if (newName) {
                label.textContent = newName;
            }
        } else if (action === "leave") {
            currentBox.remove();
        }
        menu.style.display = "none";
    });

    // hide menu when clicking outside of the element
    document.addEventListener("click", () => {
        menu.style.display = "none";
    });

    // hide menu on scroll or resize too
    window.addEventListener("scroll", () => menu.style.display = "none");
    window.addEventListener("resize", () => menu.style.display = "none");

    // group menu to create a new group or join a group (with code or link)
    const groupMenu = document.createElement("div");
    groupMenu.id = "group-menu";
    groupMenu.style.position = "absolute";
    groupMenu.style.background = "#fff";
    groupMenu.style.border = "1px solid #ccc";
    groupMenu.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    groupMenu.style.padding = "10px";
    groupMenu.style.display = "none";
    groupMenu.style.zIndex = "1000";
    groupMenu.innerHTML = `
        <div class="menu-option" data-action="create" style="padding: 5px; cursor: pointer;">Create New Group</div>
        <div class="menu-option" data-action="join" style="padding: 5px; cursor: pointer;">Join Group</div>
    `;
    document.body.appendChild(groupMenu);

    // target the plus sign image only (for adding groups)
    const addGroupBtn = document.querySelector("#add-group-button img");

    // making sure the event listener is attached only to the plus sign image
    addGroupBtn.addEventListener("click", (e) => {
        const { clientX: mouseX, clientY: mouseY } = e;
        groupMenu.style.left = `${mouseX}px`;
        groupMenu.style.top = `${mouseY}px`;
        groupMenu.style.display = "block";
        e.stopPropagation(); // prevent bubbling up
    });

    groupMenu.addEventListener("click", (e) => {
        const action = e.target.getAttribute("data-action");

        if (action === "create") {
            const groupName = prompt("Enter new group name:");
            if (groupName) {
                const groupSection = document.querySelector(".groups-section .three-grid");
                const newGroup = document.createElement("div");
                newGroup.className = "box";
                newGroup.innerHTML = `
                    <div class="box-align">
                        <img src="icons/group_5225945.png" alt="Groups Icon" style="width: 36px; vertical-align: middle;">
                        <p class="box-label">${groupName}</p>
                        <img src="icons/three-dots_8637643.png" alt="Three Dots Icon" style="width:20px; vertical-align: middle; cursor: pointer;">
                    </div>
                `;
                groupSection.appendChild(newGroup);

                // event listener to the newly created group's three dots
                attachThreeDotsMenu(newGroup.querySelector("img:last-child"));
            }
        } else if (action === "join") {
            const code = prompt("Enter group code or link:");
            if (code) {
                alert("Joining group with code/link: " + code);
            }
        }
        groupMenu.style.display = "none";
    });

    // hide menu when clicking outside of the element
    document.addEventListener("click", () => {
        groupMenu.style.display = "none";
    });

    // attach listener to the three dots menu for new groups
    function attachThreeDotsMenu(dotElement) {
        dotElement.addEventListener("click", (e) => {
            e.stopPropagation();
            currentBox = dotElement.closest(".box");
            const { clientX: mouseX, clientY: mouseY } = e;
            menu.style.left = `${mouseX}px`;
            menu.style.top = `${mouseY}px`;
            menu.style.display = "block";
        });
    }
});

// things i need to do: refix the folders and files section when clicking the three dots menu
// add menu when the star is clicked?
// list out all the names of people in a group - need external data