#Overview

This is a react web application which has a microphone (voice) as the only input for chat. The response from the copilot includes text and voice. This sample was derived from https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/06.recomposing-ui/c.smart-display, but changed if a new ways.

1 - It doesn't use direct line speech, it uses Azure Cognitive Speech
2 - It allows for the Copilot Studio bot to live in Europe i.e. in app.js, you will see that the domain property is used to support bots in other regions
3 - It assumes another service exists to return the auth token for Azure Cognitive Speach service, with keys of region and authorizationToken
4 - A few other JS files have been removed which were not needed
