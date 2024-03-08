import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import PageLayout from "./pages/Layout/PageLayout";
import routes from "./routes";
import ResourcesPage from "./pages/Resources/ResourcesPage";
import WorkflowResourcePage from "./pages/WorkflowResource/WorkflowResourcePage";
import HomePage from "./pages/HomePage";
import BpmnPage from "./pages/Bpmn/BpmnPage";
import BpmnDetailPage from "./pages/Bpmn/BpmnDetailPage";
import CreateBpmnPage from "./pages/Bpmn/CreateBpmnPage";
import AssociateBpmnPage from "./pages/Bpmn/AssociateBpmnPage";
import UpgradeBpmnPage from "./pages/Bpmn/UpgradeBpmnPage";
import LoginPage from "./pages/LoginPage";
import LoginPageCallback from "./pages/LoginPageCallback";
import PrivateRoute from "./components/NavigationComponents/PrivateRoute";
import CreateWRPage from "./pages/WorkflowResource/CreateWRPage";
import WorkflowResourceDetailPage from "./pages/WorkflowResource/WorkflowResourceDetailPage";
import ErrorPage from "./pages/ErrorPage";
import CreateResourcesPage from "./pages/Resources/CreateResourcesPage";
import ResourcesDetailPage from "./pages/Resources/ResourcesDetailPage";
import { JwtUser } from "./model/UserModel";

const LocalRoutes = () => (
	<Routes>
		<Route element={<PrivateRoute />}>
			<Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
				
			<Route path={routes.BPMN} element={<PageLayout><BpmnPage /></PageLayout>} />
			<Route path={routes.BPMN_DETAILS} element={<PageLayout><BpmnDetailPage /></PageLayout>} />
			<Route path={routes.CREATE_BPMN} element={<PageLayout><CreateBpmnPage /></PageLayout>} />
			<Route path={routes.ASSOCIATE_BPMN} element={<PageLayout><AssociateBpmnPage /></PageLayout>} />
			<Route path={routes.UPGRADE_BPMN} element={<PageLayout><UpgradeBpmnPage /></PageLayout>} />

			<Route path={routes.WORKFLOW_RESOURCES} element={<PageLayout><WorkflowResourcePage /></PageLayout>} />
			<Route path={routes.WORKFLOW_RESOURCE_DETAILS} element={<PageLayout><WorkflowResourceDetailPage /></PageLayout>} />
			<Route path={routes.CREATE_WR} element={<PageLayout><CreateWRPage /></PageLayout>} />

			<Route path={routes.RESOURCES} element={<PageLayout><ResourcesPage /></PageLayout>} />
			<Route path={routes.RESOURCES_DETAILS} element={<PageLayout><ResourcesDetailPage /></PageLayout>} />
			<Route path={routes.CREATE_RESOURCE} element={<PageLayout><CreateResourcesPage /></PageLayout>} />
		</Route>
		<Route path={routes.LOGIN} element={<PageLayout><LoginPage /></PageLayout>} />
		<Route path={routes.LOGIN_BACK} element={<PageLayout><LoginPageCallback /></PageLayout>} />
		<Route path="*" element={<ErrorPage />} />
		
	</Routes>
);

function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;

	const [warningCodeValue, setWarningCodeValue] = useState("");
	const temp= localStorage.getItem("tempLog");
	const jwt= localStorage.getItem("jwt_console");
	const debugOn=sessionStorage.getItem("debugOn");
	const [logged, setLogged] = useState(temp||jwt?true:false);
	const [userEmail, setUserEmail] = useState<JwtUser>({ email: undefined });
	const [inLoginPage, setInLoginPage] = useState(false);
	const abortController = new AbortController();

	function clearAll(){

		if(localStorage.getItem("jwt_console")){
			setTokenExpired();
		}
		clearStorage();
	}

	function setTokenExpired(){
		localStorage.removeItem("jwt_console");
		setLogged(false);
	}

	function clearStorage(){
		if(sessionStorage.getItem("recordParams")){
			sessionStorage.removeItem("recordParams");		
		}
		if(sessionStorage.getItem("recordParamsAssociated")){
			sessionStorage.removeItem("recordParamsAssociated");
		}
	}


	const values = {
		warningCodeValue,
		setWarningCodeValue,
		clearAll,
		setTokenExpired,
		logged, 
		setLogged,
		userEmail,
		setUserEmail,
		inLoginPage,
		setInLoginPage,
		abortController,
		debugOn,
		clearStorage,
	};

	useEffect(() => {
		if(debugOn){
			console.log("ATM-LAYER-WEB-CONSOLE-RELEASE VERSION:", RELEASE_VERSION);
		}
	}, []);

	useEffect(() => {
		if(debugOn){
			console.log("login utente", logged);
		}
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
