import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import PageLayout from "./pages/Layout/PageLayout";
import routes from "./routes";
import { CommonErrorPage } from "./pages/ErrorPage/CommonErrorPage";
import WarningCodeInput from "./pages/WarningCodePage/WarningCodeInput";
import Layout from "./pages/Layout/Layout";
import BpmnPage from "./pages/BpmnPage/BpmnPage";
import HomePage from "./pages/Layout/HomePage";
import NoPage from "./pages/NoPage";

const LocalRoutes = () => (
	
	<BrowserRouter basename="/web-console">
		<PageLayout>
			<Routes>
				<Route path="/" element={<Layout children={<HomePage />} />} />
				<Route index path={routes.HOME} element={<Layout children={<HomePage />} />} />
				<Route path={routes.BPMN} element={<Layout children={<BpmnPage />} />} />
				<Route path={routes.WARNING_CODE} element={<Layout children={<WarningCodeInput />} />} />
				<Route
					path={routes.ERROR_PAGE}
					element={<Layout children={<CommonErrorPage title={""} icon={undefined} />} />}
				/>
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
		console.log("ATM-LAYER-EMULATOR-RELEASE VERSION:", RELEASE_VERSION);
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
