/* eslint-disable quotes */
import React, { useContext } from "react";
import { Ctx } from "../../DataContext";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { ScannerPage } from "../ScannerPage/ScannerPage";
import { InputFieldPage } from "../InputFieldPage/InputFieldPage";
import { HomePage } from "./HomePage";

export default function PageLayout() {

	const context = useContext(Ctx);
	const { loading } = context;

	return (
		<Ctx.Consumer>
			{() => (
				<React.Fragment>
					{loading ? <LoadingPage /> : <InputFieldPage />}
				</React.Fragment>
			)}
		</Ctx.Consumer>
	);
}
