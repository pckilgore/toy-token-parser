import React from "react";
import "./styles.css";

import mustache from "mustache";

export default function App() {
  const [input, setInput] = React.useState("");
  const [lastValidParse, setValid] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [rendered, setRendered] = React.useState("");
  React.useEffect(() => {
    try {
      const parsed = mustache.parse(input);
      setValid(parsed);
    } catch (e) {}
  }, [input]);
  React.useEffect(() => {
    try {
      const rendered = mustache.render(input, values);
      setRendered(rendered);
    } catch (e) {}
  }, [input, values]);

  return (
    <div>
      <label htmlFor="url">url </label>
      <input
        id="url"
        type="text"
        onChange={e => setInput(e.target.value)}
        value={input}
        style={{ width: "100%" }}
      />
      <h2>{rendered}</h2>
      {lastValidParse
        .filter(([n]) => n === "name")
        .map(token => (
          <TokenInput
            key={token[1]}
            values={values}
            token={token}
            setValues={setValues}
          />
        ))}
      <pre>{JSON.stringify(lastValidParse, null, 2)}</pre>
    </div>
  );
}

function TokenInput({ token, values, setValues }) {
  const handleChange = e => {
    const value = e.target.value;
    setValues(state => ({ ...state, [token[1]]: value }));
  };

  return (
    <div>
      <label htmlFor={token[1]}>{token[1]} </label>
      <input
        id={token[1]}
        type="text"
        onChange={handleChange}
        value={values[token[1]] || ""}
      />
    </div>
  );
}
