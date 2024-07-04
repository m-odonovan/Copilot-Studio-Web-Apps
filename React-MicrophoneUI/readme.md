# Overview

This is a react web application which has a microphone (voice) as the only input for chat. The response from the copilot includes text and voice. This sample was derived from https://github.com/microsoft/BotFramework-WebChat/tree/main/samples/06.recomposing-ui/c.smart-display, but changed if a new ways.

1. It doesn't use <a href="https://github.com/microsoft/BotFramework-WebChat/blob/main/docs/DIRECT_LINE_SPEECH.md">Direct Line Speech</a>, it uses <a href="https://github.com/microsoft/BotFramework-WebChat/blob/main/docs/SPEECH.md">Azure Cognitive Speech</a>
2. It allows you to choose the voice to use, edit app.js to do this
3. It allows for the Copilot Studio bot to live in Europe i.e. in app.js, you will see that the domain property is used to support bots in other regions
4. It assumes another service exists to return the auth token for Azure Cognitive Speach service, as a JSON object, with keys of region and authorizationToken
5. A few other JS files have been removed which were not needed

To use, edit app.js to point to your Copilot Studio bot, and edit fetchSpeechToken.js to point to your host which returns the auth token for Speech Services. Use Node and run NPM install to install node modules needed, and run NPM start to buiuld and start the web application.

Note - I have included a seperate sample Azure Function for hosting a service which generates your Speech Service Token.
