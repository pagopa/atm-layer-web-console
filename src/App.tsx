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
import BankPage from "./pages/Banks/BankPage";
import BankDetailPage from "./pages/Banks/BankDetailPage";
import UsersPage from "./pages/Users/UsersPage";
import ProtectedRoute from "./components/NavigationComponents/ProtectedRoute";
import { BANCHE, LETTURA, SCRITTURA, TRANSAZIONI, UTENTI } from "./commons/constants";
import { Profile, User } from "./model/UserModel";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import ErrorPageUsersInDb from "./pages/ErrorPageUsersInDb";

const LocalRoutes = () => (
	<Routes>
		<Route element={<PrivateRoute />}>
			<Route path="/" element={<PageLayout><HomePage /></PageLayout>} />

			<Route element={<ProtectedRoute profileRequired={LETTURA}/>}>	
				<Route path={routes.BPMN} element={<PageLayout><BpmnPage /></PageLayout>} />
				<Route path={routes.BPMN_DETAILS} element={<PageLayout><BpmnDetailPage /></PageLayout>} />
				<Route path={routes.WORKFLOW_RESOURCES} element={<PageLayout><WorkflowResourcePage /></PageLayout>} />
				<Route path={routes.WORKFLOW_RESOURCE_DETAILS} element={<PageLayout><WorkflowResourceDetailPage /></PageLayout>} />
				<Route path={routes.RESOURCES} element={<PageLayout><ResourcesPage /></PageLayout>} />
				<Route path={routes.RESOURCES_DETAILS} element={<PageLayout><ResourcesDetailPage /></PageLayout>} />
			</Route>
			
			<Route element={<ProtectedRoute profileRequired={SCRITTURA}/>}>
				<Route path={routes.CREATE_BPMN} element={<PageLayout><CreateBpmnPage /></PageLayout>} />
				<Route path={routes.ASSOCIATE_BPMN} element={<PageLayout><AssociateBpmnPage /></PageLayout>} />
				<Route path={routes.UPGRADE_BPMN} element={<PageLayout><UpgradeBpmnPage /></PageLayout>} />
				<Route path={routes.CREATE_WR} element={<PageLayout><CreateWRPage /></PageLayout>} />
				<Route path={routes.CREATE_RESOURCE} element={<PageLayout><CreateResourcesPage /></PageLayout>} />
			</Route>

			<Route element={<ProtectedRoute profileRequired={TRANSAZIONI}/>}>
				<Route path={routes.TRANSACTIONS} element={<PageLayout><TransactionsPage /></PageLayout>} />
			</Route>

			<Route element={<ProtectedRoute profileRequired={BANCHE}/>}>
				<Route path={routes.BANK} element={<PageLayout><BankPage /></PageLayout>} />
				<Route path={routes.BANK_DETAILS} element={<PageLayout><BankDetailPage /></PageLayout>} />
			</Route>
			
			
			<Route element={<ProtectedRoute profileRequired={UTENTI}/>}>
				<Route path={routes.USERS} element={<PageLayout><UsersPage /></PageLayout>} />
			</Route>

			<Route path={routes.UNAUTHORIZED_PAGE} element={<PageLayout><ErrorPage /></PageLayout>} />
			<Route path={routes.ERROR_PAGE_USERS_DB} element={<PageLayout><ErrorPageUsersInDb /></PageLayout>} />
			
		</Route>
		<Route path={routes.LOGIN} element={<PageLayout><LoginPage /></PageLayout>} />
		<Route path={routes.LOGIN_BACK} element={<PageLayout><LoginPageCallback /></PageLayout>} />
		
	</Routes>
);

function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;

	const [warningCodeValue, setWarningCodeValue] = useState("");
	const jwt= sessionStorage.getItem("jwt_console");
	const debugOn=sessionStorage.getItem("debugOn");
	const [logged, setLogged] = useState(jwt?true:false);
	const abortController = new AbortController();
	const [loggedUserInfo, setLoggedUserInfo] = useState<User>({
		userId: "",
		name:"",
		surname:"",
		createdAt: "",
		lastUpdatedAt: "",
		profiles: [] as Array<Profile>
	});

	const [profilesAvailable, setProfilesAvailable] = useState<Array<Profile>>([{
		description: "",
		profileId: 0,
		createdAt: "",
		lastUpdatedAt: "",
	}]);

	function clearAll(){
		if(sessionStorage.getItem("jwt_console")){
			setTokenExpired();
		}
		clearStorage();
	}

	function setTokenExpired(){

		sessionStorage.removeItem("jwt_console");
		setLogged(false);
	}

	function clearStorage(){
		if(sessionStorage.getItem("recordParams")){
			sessionStorage.removeItem("recordParams");		
		}
		if(sessionStorage.getItem("recordParamsAssociated")){
			sessionStorage.removeItem("recordParamsAssociated");
		}
		if(sessionStorage.getItem("recordParamsUser")){
			sessionStorage.removeItem("recordParamsUser");
		}
		if(sessionStorage.getItem("recordParamsBank")){
			sessionStorage.removeItem("recordParamsBank");
		}
	}


	const values = {
		warningCodeValue,
		setWarningCodeValue,
		clearAll,
		setTokenExpired,
		logged, 
		setLogged,
		abortController,
		debugOn,
		clearStorage,
		loggedUserInfo,
		setLoggedUserInfo,
		profilesAvailable,
		setProfilesAvailable
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

	useEffect(() => {
		if (loggedUserInfo.userId) {
			sessionStorage.setItem("loggedUserInfo", JSON.stringify(loggedUserInfo));
		}
	}, [loggedUserInfo]);

	return (
		<ThemeProvider theme={themeApp}>
			<Ctx.Provider value={values}>
				{LocalRoutes()}				
			</Ctx.Provider>
		</ThemeProvider>
	);
}

export default App;
