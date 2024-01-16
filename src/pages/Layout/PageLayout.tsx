/* eslint-disable quotes */
import React, { useContext } from "react";
import { Ctx } from "../../DataContext";
import { LoadingPage } from "../LoadingPage/LoadingPage";


type Prop= {
	page: any;
};

export default function PageLayout({page}: Prop) {

	const { loading } = useContext(Ctx);

	return (
		<Ctx.Consumer>
			{() => (
				<React.Fragment>
					{loading ? <LoadingPage /> : page}
				</React.Fragment>
			)}
		</Ctx.Consumer>
	);
}
