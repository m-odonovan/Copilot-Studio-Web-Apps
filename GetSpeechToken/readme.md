# Overview

All the web samples provided which use Azure Speech service for voice <-> text, assume you have another host/function which returns an authorization token for the Azure Speech service. This sample is an Azure Function which generates that authorization token for you, and returns it as a JSON object with keys of region and authoirzationToken

This sample is an HTTP Trigger portal designer edited C# function. It's pretty basic and probably needs some work to make more robust, but works for my demonstrations.

Note - it has the Speech Services key hard coded in the source. It's recommend you change this to use managed identity instead for production scenario.

You will need to add the host URL of you web chat app as a host in CORS configuration, otherwise the function will not allow the calling application to call it.
