import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnmount: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 5 * 60 * 1000,
		},
	},
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
					<ReactQueryDevtools initialIsOpen />
				</QueryClientProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
