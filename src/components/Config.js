import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as FlickrAPI from "../data/FlickrAPI";

export const Config = props => {
  // Get the API key from local storage.
  const [apiKey, setApiKey] = useLocalStorage("FLICKR_API_KEY", "");
  const [pending, setPending] = useState(false);
  const [tested, setTested] = useState(false);
  const [photos, setPhotos] = useState({});

  const testApi = async () => {
    setPending(true);
    setTested(false);
    setPhotos({});
    try {
      const photos = await FlickrAPI.search(apiKey, "people", 3);
      setPhotos(photos);
    } finally {
      setPending(false);
      setTested(true);
    }
  };

  // Handle input changes.
  const onChange = e => {
    setApiKey(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(apiKey);
    testApi();
  };

  // Allow the parent component to listen to api key changes.
  useEffect(() => {
    if (props.onApiKeyChange) {
      props.onApiKeyChange(apiKey);
    }
  }, [apiKey]);

  return (
    <div id="accordion">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <button
              className="btn btn-link block"
              data-toggle="collapse"
              data-target="#config-form"
            >
              Config
            </button>
          </h5>
        </div>

        <div
          id="config-form"
          className="collapse show"
          data-parent="#accordion"
        >
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label for="api-key">Flickr API Key</label>
                <input
                  type="text"
                  className="form-control"
                  id="api-key"
                  value={apiKey}
                  onChange={onChange}
                />
                <small className="form-text text-muted">
                  You can get a new API key or view your existing ones at{" "}
                  <a
                    target="_blank"
                    href="https://www.flickr.com/services/apps/create/"
                  >
                    Flickr
                  </a>
                  .
                </small>
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={pending}
                >
                  {pending ? "Testing API..." : "Test API"}
                </button>
              </div>

              {tested && (
                <>
                  {photos && photos.stat === "ok" ? (
                    <div className="alert alert-success">
                      <p>FlickrAPI.search was successful:</p>
                      <pre>{JSON.stringify(photos, null, 2)}</pre>
                    </div>
                  ) : (
                    <div className="alert alert-warning">
                      <p>FlickrAPI.search had an issue:</p>
                      <pre>{JSON.stringify(photos, null, 2)}</pre>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
