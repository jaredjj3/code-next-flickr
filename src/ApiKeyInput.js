import React, { useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { debounce } from "lodash";

export const ApiKeyInput = props => {
  // Get the API key from local storage.
  const [apiKey, setApiKey] = useLocalStorage("FLICKR_API_KEY", "");

  // Handle input changes.
  const onChange = e => {
    setApiKey(e.target.value);
  };

  // Allow the parent component to listen to api key changes.
  useEffect(() => {
    if (props.onApiKeyChange) {
      props.onApiKeyChange(apiKey);
    }
  }, [apiKey]);

  return (
    <div className="form-group">
      <label for="api-key">Flickr API Key</label>
      <input
        type="email"
        className="form-control"
        id="api-key"
        value={apiKey}
        onChange={onChange}
      />
      <small className="form-text text-muted">
        You can get a new API key or view your existing ones at{" "}
        <a target="_blank" href="https://www.flickr.com/services/apps/create/">
          Flickr
        </a>
        .
      </small>
    </div>
  );
};
