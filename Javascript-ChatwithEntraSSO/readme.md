## Provide SSO with Entra ID (Azure AD)
This is a similar example to Javascript-Chat, but includes SSO support using Entra ID. The idea is that the host page authenticates the user against Entra ID (Azure AD), and then the user can interact with the authenticated copilot without having to login again. The copilot uses a SSO token generated from the host page. This would be useful on intranet type applications. The formal documentation on how to set this up, is documented here - https://learn.microsoft.com/en-us/microsoft-copilot-studio/configure-sso. Follow these instructions to setup the scenario. This documentation will essentially guide you through the following steps:

1. You need an Entrat ID (Azure AD) app registration for your Copilot Studio copilot i.e. it must be setup as manual authentication.
2. You need a second Entra ID (Azure AD) App registration for the host page (canvas) i.e. this HTML page.
3. You need to in the copilot App registration, expose an API, and add a client application, which is the ID of the canvas app registatrion. This establishes the "link" between them

## Notes

- This sample is based on combing these 2 different samples:
  - There is a basic SSO for Web Chat Control sample, but it uses MSAL version 1; https://github.com/microsoft/PowerVirtualAgentsSamples/blob/master/BuildYourOwnCanvasSamples/3.single-sign-on/index.html
  - There is a basic using MSAL 2.0 in Javascript sample; https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-browser-samples/TestingSample/app/index.html
- Configuration:
  - edit autConfig.js to point to your Client ID from canvas app and add Directory Id the authority URL
  - edit this HTML page and replace the DirectLine URL with your copilot's URL i.e. the variabled call theURL
  - You can sign into the host page using a popup or a redirect. With popup, once signed in, you will need to refresh the page for the web chat control to work.
  
- This sample is provided "as-is", it hasnt been fully tested, and it more intended to demonstrate what is possible

This screen shot below, shows how the bot auto authenticated using the identity of the user who is signed into the page.
![SSO chat screenshot](https://github.com/m-odonovan/CopilotStudioWebApps/blob/main/Javascript-ChatwithEntraSSO/images/screenshot.png "SSO chat screenshot")


