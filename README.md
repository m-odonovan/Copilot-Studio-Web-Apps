# Copilot Studio Web Apps
These are samples that I have used to demonstrate various web experiences for Copilot Studio bots. Most of the source for these has been derived from the samples found at https://github.com/microsoft/BotFramework-WebChat/tree/main/samples.

These samples are provided as-is. They have not been tested in production scenarios. They are merely demonstrations of how to achieve various custom user experiences for Copilot Studio bots (copilots).

## Javascript-Chat
Simple single HTML page, which uses Microsoft Bot Framework webchat control to render a dark themed full page customised chat experience.

## Javascript-ChatWithAudio
Simple single HTML page, which uses Microsoft Bot Framework webchat control to render a customised web chat experience, which includes a microphone button so that you can use your voice to chat with the copilot. It will respond with audio.

## Javascript-ChatWithEntraSSO
This is a variation of the Javascript-Chat sample, but supports using Entra ID authentication and identity. In this sample, the copilot supports Entra ID authentication, and so the HTML page which the web chat control lives on, if authenticated, will pass a token into the copilot so that you don't have to authenticate twice.

## React-MicrophoneUI
This is a react web application which has a microphone (voice) as the only input for chat. 

## GetSpeechToken
This sample is an HTTP Trigger C# Azure function. Which generates an Azure Speech service authorization token. This token is used in the samples which use voice and audio. The speech service is used to text to speech and speech to text.
