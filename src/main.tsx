import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store/store";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
					{/* <ReactQueryDevtools position="bottom-right" /> */}
				</Provider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
