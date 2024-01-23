/* eslint-disable quotes */
import React, { useContext, useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { Ctx } from "../../DataContext";
import { LoadingPage } from "../LoadingPage";
import { Header } from "../../components/HeaderComponents/Header";
import CustomAppBar from "../../components/Menu/CustomAppBar";


type Prop= {
	children: React.ReactNode;
};

export default function PageLayout({ children }: Prop) {

	const { loading } = useContext(Ctx);

	return (
		<Ctx.Consumer>
			{() => (
				<Box
					display={"flex"}
					flexDirection= "column"
					minHeight={"100vh"}
				>
					<Box gridArea="header" sx={{ position: "sticky", top: 0, zIndex: "100" }}>
						<Header />
						<CustomAppBar />
					</Box>
					<Grid container direction="row" flexGrow={1}  sx={{maxHeight:"calc(100vh - 110px)", overflowY:"auto"}}>
						{loading ? <LoadingPage /> : children}
					</Grid>
				</Box>
				
			)}
		</Ctx.Consumer>
	);
}
