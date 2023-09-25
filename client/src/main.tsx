import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/redux-store/store.ts";
import "./index.css";
import "./i18n.ts";
import "animate.css";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import { BrowserRouter } from "react-router-dom";
import { localStorageChanged } from "./store/slices/cartSlice/cart-slice.ts";

window.addEventListener("storage", function (event) {
  if (event.key === "cart" && event.newValue) {
    const updatedCart = JSON.parse(event.newValue);
    store.dispatch(localStorageChanged(updatedCart));
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <FpjsProvider
        loadOptions={{
          apiKey: "s8K0x6erD9unanV3oDfz",
        }}
      >
        <App />
      </FpjsProvider>
    </Provider>
  </BrowserRouter>
);
