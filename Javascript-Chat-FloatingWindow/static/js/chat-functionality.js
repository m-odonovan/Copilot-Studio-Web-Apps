// Main Chat Widget Functionality

function toggleChat() {
  const widget = document.getElementById('chatWidget');
  const minimizedBtn = document.getElementById('chatMinimizedBtn');

  console.log('Toggle clicked, widget has minimized class:', widget.classList.contains('minimized'));

  if (widget.classList.contains('minimized')) {
    // Open the chat
    widget.classList.remove('minimized');
    minimizedBtn.style.display = 'none';

    // Initialize drag functionality when chat opens
    setTimeout(() => {
      initializeDragFunctionality();
    }, 100);

    console.log('Chat opened');
  } else {
    // Close the chat
    widget.classList.add('minimized');
    minimizedBtn.style.display = 'flex';

    // Reset position when closing
    resetChatPosition();

    console.log('Chat minimized');
  }
}

function restartChat() {
  

  // Unsubscribe from the old store before clearing it
  if (webChatSubscription) {
    webChatSubscription();
    webChatSubscription = null;
    console.log('Unsubscribed from old WebChat store');
  }

  // Disconnect existing DirectLine connection
  if (directLineClient) {
    try {
      directLineClient.end();
    } catch (err) {
      console.log('Error ending DirectLine connection:', err);
    }
    directLineClient = null;
  }

  // Clear the web chat store
  if (webChatStore) {
    webChatStore = null;
  }

  // Remove the webchat container and re-add it to force a full re-render
  const chatContent = document.querySelector('.chat-content');
  const oldWebchat = document.getElementById('webchat');
  if (oldWebchat) {
    oldWebchat.remove();
  }
  const newWebchat = document.createElement('div');
  newWebchat.id = 'webchat';
  chatContent.appendChild(newWebchat);

  // Reinitialize the chat
  initializeChat();
}

async function initializeChat() {
  console.log('Starting chat initialization...');

 


  // Get Direct Line token and start chat
  try {
    console.log('Fetching DirectLine token...');
    const tokenResponse = await fetch(CHAT_CONFIG.tokenEndpoint, { method: 'GET' });
    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch Direct Line token: ${tokenResponse.status}`);
    }
    const { token } = await tokenResponse.json();
    console.log('DirectLine token received');

    // Create new DirectLine client
    directLineClient = window.WebChat.createDirectLine({ token });
    console.log('DirectLine client created');

    // Create new Web Chat store
    webChatStore = window.WebChat.createStore();
    console.log('Web Chat store created');

 

    // Get the webchat container
    const webchatElement = document.getElementById('webchat');

    // Clear any existing content
    webchatElement.innerHTML = '';

    console.log('Rendering Web Chat...');

    // Render Web Chat with speech recognition enabled but TTS disabled
    window.WebChat.renderWebChat(
      {
        directLine: directLineClient,
        store: webChatStore,
        locale: 'en-US',
        styleOptions: {
          hideUploadButton: false,
          backgroundColor: "#fff",
          bubbleBackground: "#fff",
          bubbleTextColor: "#181818",
          fontFamily: "'Montserrat', Arial, sans-serif",
          botAvatarBackgroundColor: "#667eea",
          userAvatarBackgroundColor: "#764ba2",
          suggestedActionBackgroundColor: "#667eea",
          suggestedActionBorderColor: "#667eea",
          microphoneButtonColorOnDictate: "#667eea"
        }
      },
      webchatElement
    );

    // Send startConversation event
    if (directLineClient) {
      directLineClient.postActivity({
        type: 'event',
        name: 'startConversation',
        from: { id: 'user', name: 'User' }
      }).subscribe(
        id => console.log('startConversation event sent:', id),
        err => console.error('Failed to send startConversation event:', err)
      );
    }

    console.log('Web Chat rendered successfully');
    console.log('DirectLine connected successfully');
  } catch (err) {
    console.error('Error connecting to DirectLine:', err);
    const webchatElement = document.getElementById('webchat');
    webchatElement.innerHTML = `<div style="color:red; padding: 20px; text-align: center; font-size: 12px;">
      ❌ Error connecting to chat service<br>
      <small>${err.message}</small><br>
      <button onclick="initializeChat()" style="margin-top: 10px; padding: 5px 10px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
        🔄 Try Again
      </button>
    </div>`;
  }

  // Add this at the end of the successful initialization
  setTimeout(() => {
    initializeDragFunctionality();
  }, 500);
}




// Initialize when page loads
window.addEventListener('load', initializeChat);