/* eslint-disable quotes */
import React, { useContext } from "react";
import { Ctx } from "../../DataContext";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { ScannerPage } from "../ScannerPage/ScannerPage";
import { HomePage } from "./HomePage";

export default function PageLayout() {

	const context = useContext(Ctx);
	const { loading } = context;

	setTimeout(loading, 3000);

	return (
		<Ctx.Consumer>
			{() => (
				<React.Fragment>
					{loading ? <LoadingPage /> : <ScannerPage />}
				</React.Fragment>
			)}
		</Ctx.Consumer>
	);
}
