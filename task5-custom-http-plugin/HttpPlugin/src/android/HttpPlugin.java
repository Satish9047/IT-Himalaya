package http-plugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import java.net.URI;
import java.net.http.httpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpHeaders;
import java.time.Duration;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class HttpPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, String url, CallbackContext callbackContext) throws JSONException {
        if(action.equals("getHttpRequest")){
            this.getHttpRequest(url, callbackContext);
            return true;
        }
        return false;
    }

     //HttpRequest
    private Object getHttpRequest(String url,  CallbackContext callbackContext){
        try{

            HttpClient client = HttpClient.newHttpClient().newBuilder().connectTimeout(Duration.ofSeconds(5)).build();
            HttpRequest request =  HttpRequest.newBuilder().url(URI.create(url)).GET().build();

            HttpResponse <String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if(response.statusCode() == 200){
                JSONObject jsonResponse = new JSONObject(response.body());
                system.out.println(jsonResponse);
                callbackContext.success(jsonResponse);

            }else{
                system.out.println("Error: " + response.statusCode());
                callbackContext.error("Error: " + response.statusCode());
            }
        }
    }
}

