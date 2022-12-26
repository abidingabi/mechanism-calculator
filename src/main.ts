import "./app.css";
import Index from "./pages/Index.svelte";
import Motor from "./pages/Motor.svelte";

export const paths = {
  "/": Index,
  "/tools/motor/": Motor,
};

const app = new paths[window.location.pathname]({
  target: document.getElementById("app"),
});

export default app;
