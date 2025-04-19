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
