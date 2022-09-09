import { Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<div className="App">
			<Route path="/login">
				<LoginPage />
			</Route>
		</div>
	);
}

export default App;
