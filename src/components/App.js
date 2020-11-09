import React, { useState } from "react";
import { Config } from "./Config";

export const App = () => {
  const [apiKey, setApiKey] = useState("");

  const onApiKeyChange = nextApiKey => {
    setApiKey(nextApiKey);
  };

  return (
    <div className="container">
      <Config onApiKeyChange={onApiKeyChange} />
      <hr />
    </div>
  );
};
