#r "Newtonsoft.Json"

using System.Net;
using System.Text;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

private static readonly HttpClient httpClient = new HttpClient();

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    string speechKey = "<add key here>";
    string speechRegion = "<add region here>"; //eastus,swedencentral, southafricanorth
    string endpoint = $"https://{speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken";

    log.LogInformation("C# HTTP trigger function processed a request.");    

    try
        {
            httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", speechKey);
            var response = await httpClient.PostAsync(endpoint, null);

            if (response.IsSuccessStatusCode)
            {
                string token = await response.Content.ReadAsStringAsync();
                var myObj = new {authorizationToken = token, region = speechRegion};
                var jsonToReturn = JsonConvert.SerializeObject(myObj);
                return new OkObjectResult(jsonToReturn);                
            }

            var error = "Failed to get speech token. StatusCode:";
            log.LogError("Failed to get speech token. StatusCode: {statusCode}, Reason: {reason}", 
            response.StatusCode, response.ReasonPhrase);
            return new OkObjectResult(error);
        }
        catch (Exception ex)
        {
            log.LogError(ex, "Error occurred while getting speech token");
        }
}
