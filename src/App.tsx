import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import PageLayout from "./pages/Layout/PageLayout";
import routes from "./routes";
import Layout from "./pages/Layout/Layout";
import BpmnPage from "./pages/BpmnPage/BpmnPage";
import NoPage from "./pages/NoPage";
import ResourcesPage from "./pages/ResourcesPage";
import WorkflowResourcePage from "./pages/WorkflowResourcePage";
import HomePage from "./pages/HomePage";

// const LocalRoutes = () => (
// 	<Layout>
// 		<Routes>
// 			<Route path="/" element={<PageLayout page={<HomePage />} />} />
// 			<Route path="/home" element={<PageLayout page={<HomePage />} />} />
// 			<Route path={routes.BPMN} element={<PageLayout page={<BpmnPage />} />} />
// 			<Route path={routes.WARNING_CODE} element={<PageLayout page={<WarningCodeInput />} />} />
// 			<Route
// 				path={routes.ERROR_PAGE}
// 				element={<PageLayout page={<CommonErrorPage title={""} icon={undefined} />} />}
// 			/>
// 		</Routes>
// 	</Layout>
// import NoPage from "./pages/NoPage";

const LocalRoutes = () => (
	
	<BrowserRouter basename="/webconsole">
		<PageLayout>
			<Routes>
				<Route path="/" element={<Layout children={<HomePage />} />} />
				<Route index path={routes.HOME} element={<Layout children={<HomePage />} />} />
				<Route path={routes.BPMN} element={<Layout children={<BpmnPage />} />} />
				<Route path={routes.RESOURCES} element={<Layout children={<ResourcesPage />} />} />
				<Route path={routes.WORKFLOW_RESOURCES} element={<Layout children={<WorkflowResourcePage />} />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</PageLayout>
	</BrowserRouter>
);

function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;

	const [warningCodeValue, setWarningCodeValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [headerHeight, setHeaderHeight] = useState(null);

	const values = {
		warningCodeValue,
		setWarningCodeValue,
		loading,
		setLoading,
		headerHeight,
		setHeaderHeight
	};

	useEffect(() => {
		console.log("ATM-LAYER-WEB-CONSOLE-RELEASE VERSION:", RELEASE_VERSION);
	}, []);

	return (
		<ThemeProvider theme={themeApp}>
			<Ctx.Provider value={values}>
				{LocalRoutes()}				
			</Ctx.Provider>
		</ThemeProvider>
	);
}

export default App;
