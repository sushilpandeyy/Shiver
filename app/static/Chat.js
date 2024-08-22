    async function getResponse(prompt) {
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=';
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "contents": [
              {
                "role": "user",
                "parts": [{ "text": prompt }]
              }
            ]
          })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
      } catch (error) {
        console.error('Error fetching response:', error);
        return null;
      }
    }

    document.getElementById('sendButton').addEventListener('click', handleSend);
    document.getElementById('input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleSend();
    });

    async function handleSend() {
      const inputField = document.getElementById('input');
      const messagesContainer = document.getElementById('messages');
      const input = inputField.value.trim();

      if (input) {
        addMessage(input, 'user');
        inputField.value = '';

        const response = await getResponse(input);
        if (response) {
          setTimeout(() => {
            addMessage(response, 'bot');
          }, 1000);
        }
      }
    }

    function addMessage(text, sender) {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${sender}`;
      messageElement.textContent = text;
      
      const messagesContainer = document.getElementById('messages');
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
