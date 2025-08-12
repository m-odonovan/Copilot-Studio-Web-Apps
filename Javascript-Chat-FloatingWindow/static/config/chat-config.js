// Chat Configuration
const CHAT_CONFIG = {
  tokenEndpoint: 'https://c4259b43dd33e1d7a99c3805d2faca.57.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr245_subscriberSupportAgent/directline/token?api-version=2022-03-01-preview'
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