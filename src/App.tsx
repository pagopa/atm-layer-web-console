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
// import EcFiscalCodeInput from "./pages/EcFiscalCodePage/EcFiscalCodeInput";
// import { DecodeRenderHtml } from "./components/DecodeRenderHtml/DecodeRenderHtml";
// import { HomePage2 } from "./pages/Layout/HomePage2";
// import HomeCardComponent from "./components/CardComponents/HomeCardComponent";
import Layout from "./pages/Layout/Layout";
import BpmnPage from "./pages/BpmnPage/BpmnPage";
import HomePage from "./pages/Layout/HomePage";

const LocalRoutes = () => (
	<Layout>
		<Routes>
			<Route path="/" element={<PageLayout page={<HomePage />} />} />
			{/* <Route path="/home" element={<PageLayout page={<HomePage3 />} />} /> */}
			<Route path="/home" element={<PageLayout page={<HomePage />} />} />
			<Route path={routes.BPMN} element={<PageLayout page={<BpmnPage />} />} />
			<Route path={routes.WARNING_CODE} element={<PageLayout page={<WarningCodeInput />} />} />
			<Route
				path={routes.ERROR_PAGE}
				element={<PageLayout page={<CommonErrorPage title={""} icon={undefined} />} />}
			/>
		</Routes>
	</Layout>
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
				<BrowserRouter>
					{LocalRoutes()}
				</BrowserRouter>
			</Ctx.Provider>
		</ThemeProvider>
	);
}

export default App;
