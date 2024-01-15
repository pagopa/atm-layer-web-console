import { Box, Grid } from "@mui/material";
import React from "react";
import { Header } from "./Header";


type Props = {
    children?: React.ReactNode;
};

/** The layout of the application: Header, Body */
const Layout = ({ children }: Props) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			minHeight: "100vh",
		}}
	>
		<Box gridArea="header" sx={{ position: "sticky", top: 0, zIndex: "100" }}>
			<Header />
		</Box>
		<Grid container direction="row" flexGrow={1}>
			{children}
		</Grid>
	</Box>
);

export default Layout;