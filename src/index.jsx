import React from "react";
import ReactDOM from "react-dom/client";
import ReactJsonRenderer from "./components/ReactJsonRenderer";
const structure = [
  {
    type: "div",
    props: { style: { color: "red" } },
    content: "Hola Renderer",
    children: [
      {
        type: "button",
        props: { onClick: "handleClick" },
        content: "Haz clic aquí",
      },
    ],
  },
];
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h1>Hola, React!</h1>
    <ReactJsonRenderer data={structure} />
  </React.StrictMode>
);
