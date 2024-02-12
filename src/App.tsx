import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import PageLayout from "./pages/Layout/PageLayout";
import routes from "./routes";
import NoPage from "./pages/NoPage";
import ResourcesPage from "./pages/ResourcesPage";
import WorkflowResourcePage from "./pages/WorkflowResourcePage";
import HomePage from "./pages/HomePage";
import BpmnPage from "./pages/BpmnPage";
import DetailPage from "./pages/DetailPage";
import CreateBpmnPage from "./pages/CreateBpmnPage";
import AssociateBpmnPage from "./pages/AssociateBpmnPage";
import UpgradeBpmnPage from "./pages/UpgradeBpmnPage";
import LoginPage from "./pages/LoginPage";
import LoginPageCallback from "./pages/LoginPageCallback";
import PrivateRoute from "./components/NavigationComponents/PrivateRoute";

const LocalRoutes = () =>(
	<BrowserRouter basename="/webconsole">	
		<Routes>
			<Route element={<PrivateRoute />}>
				<Route path="/" element={ <PageLayout children={<HomePage />} />}/>
				{/* <Route path={routes.HOME} element={<PageLayout children={<HomePage />} />} /> */}
				<Route path={routes.BPMN} element={<PageLayout children={<BpmnPage />} />} />
				<Route path={routes.BPMN_DETAILS} element={<PageLayout children={<DetailPage />} />} />
				<Route path={routes.RESOURCES} element={<PageLayout children={<ResourcesPage />} />} />
				<Route path={routes.WORKFLOW_RESOURCES} element={<PageLayout children={<WorkflowResourcePage />} />} />
				<Route path={routes.CREATE_BPMN} element={<PageLayout children={<CreateBpmnPage />} />} />
				<Route path={routes.ASSOCIATE_BPMN} element={<PageLayout children={<AssociateBpmnPage />} />} />
				<Route path={routes.UPGRADE_BPMN} element={<PageLayout children={<UpgradeBpmnPage />} />} />
			</Route>
			<Route path={routes.LOGIN} element={<PageLayout children={<LoginPage />} />} />
			<Route path={routes.LOGIN_BACK} element={<PageLayout children={<LoginPageCallback />} />} />
			<Route path="*" element={<NoPage />} />
		
		</Routes>
		
	</BrowserRouter>
);

function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;

	const [warningCodeValue, setWarningCodeValue] = useState("");
	// const [loading, setLoading] = useState(false);
	const temp= localStorage.getItem("tempLog");
	const [logged, setLogged] = useState(temp?temp:false);
	const [recordParams, setRecordParams] = useState();
	const abortController = new AbortController();

	function clearAll(){
		localStorage.removeItem("token");
		localStorage.removeItem("recordParams");
		localStorage.removeItem("recordParamsAssociated");
		setLogged(false);
	}
	

	const values = {
		warningCodeValue,
		setWarningCodeValue,
		// loading,
		// setLoading,
		clearAll,
		logged, 
		setLogged,
		abortController,
		setRecordParams,
		recordParams,
	};

	useEffect(() => {
		console.log("ATM-LAYER-WEB-CONSOLE-RELEASE VERSION:", RELEASE_VERSION);
	}, []);
	useEffect(() => {
		console.log("login utente", logged);
	}, [logged]);

	return (
		<ThemeProvider theme={themeApp}>
			<Ctx.Provider value={values}>
				{LocalRoutes()}				
			</Ctx.Provider>
		</ThemeProvider>
	);
}

export default App;
