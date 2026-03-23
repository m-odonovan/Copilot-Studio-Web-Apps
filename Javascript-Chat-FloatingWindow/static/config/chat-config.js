// Chat Configuration
// Note: the URL below comes from teh DirectLine speach URL in your channels section of Copilot Studio. It will have the word "directline" in the URL.
const CHAT_CONFIG = {
  tokenEndpoint: '<directlinefullpath>'
};

// Global Variables
let directLineClient = null;
let webChatStore = null;
let webChatSubscription = null;


// Drag functionality variables
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let chatStartX = 0;

let chatStartY = 0;
