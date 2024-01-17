import { Box, Grid } from "@mui/material";
import React, { useRef, useEffect, useContext } from "react";
import { Header } from "../../components/Header";
import CustomAppBar from "../../components/Menu/CustomAppBar";
import { Ctx } from "../../DataContext";

type Props = {
	children?: React.ReactNode;
};

/** The layout of the application: Header, Body */
const Layout = ({ children }: Props) => {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const { setHeaderHeight } = useContext(Ctx);

	useEffect(() => {
		if (headerRef.current) {
		  const height = headerRef.current.clientHeight;
		  setHeaderHeight(height);
		}
	  }, [headerRef, setHeaderHeight]);

	return (<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			minHeight: "100vh",
		}}
	>
		<Box gridArea="header" sx={{ position: "sticky", top: 0, zIndex: "100" }} ref={headerRef}>
			<Header />
			<CustomAppBar />
		</Box>
		<Grid container direction="row" flexGrow={1}>
			{children}
		</Grid>
	</Box>);

};

export default Layout;