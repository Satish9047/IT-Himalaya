package httpplugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * This class handles HTTP GET requests from JavaScript.
 */
public class HttpPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("getHttpRequest")) {
            String url = args.getString(0);
            this.getHttpRequest(url, callbackContext);
            return true;
        }
        return false;
    }

    private void getHttpRequest(String urlString, CallbackContext callbackContext) {
        // Use Cordova's thread pool to ensure the request runs on a background thread
        cordova.getThreadPool().execute(() -> {
            HttpURLConnection connection = null;
            BufferedReader reader = null;

            try {
                // Create URL object
                URL url = new URL(urlString);

                // Open a connection
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(5000); // 5 seconds connection timeout
                connection.setReadTimeout(5000); // 5 seconds read timeout

                // Get response code
                int responseCode = connection.getResponseCode();

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    // Read the response
                    reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }

                    // Convert response to JSON and send success callback
                    JSONObject jsonResponse = new JSONObject(response.toString());
                    callbackContext.success(jsonResponse);
                } else {
                    // Send error callback for non-200 status codes
                    callbackContext.error("HTTP error code: " + responseCode);
                }
            } catch (Exception e) {
                // Handle exceptions
                callbackContext.error("Request failed: " + e.getMessage());
            } finally {
                // Close resources
                try {
                    if (reader != null) {
                        reader.close();
                    }
                    if (connection != null) {
                        connection.disconnect();
                    }
                } catch (Exception ignored) {
                }
            }
        });
    }
}
