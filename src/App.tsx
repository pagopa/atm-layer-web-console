import "./App.css";
import HomePage from "./components/Layout/HomePage";

function App() {
	return (
		<div className="App">
			<HomePage />
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<h1>
         ATM Layer Console
				</h1>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
          Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
