import React, { useState } from "react";
import { ApiKeyInput } from "./ApiKeyInput";

export const App = () => {
  const [apiKey, setApiKey] = useState("");

  const onApiKeyChange = nextApiKey => {
    setApiKey(nextApiKey);
  };

  return (
    <div className="container">
      <ApiKeyInput onApiKeyChange={onApiKeyChange} />
      <hr />
    </div>
  );
};
