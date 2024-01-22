/* eslint-disable quotes */
import React, { useContext } from "react";
import { Ctx } from "../../DataContext";
import { LoadingPage } from "../LoadingPage/LoadingPage";


type Prop= {
	children: any;
};

export default function PageLayout({children}: Prop) {

	const { loading } = useContext(Ctx);

	return (
		<Ctx.Consumer>
			{() => (
				<React.Fragment>
					{loading ? <LoadingPage /> : children}
				</React.Fragment>
			)}
		</Ctx.Consumer>
	);
}
