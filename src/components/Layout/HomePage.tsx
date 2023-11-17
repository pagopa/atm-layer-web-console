import { AppBar, useTheme } from "@mui/material";
import React from "react";

import { Header } from "../Header";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../Footer";

function HomePage() {
	
	const theme=useTheme();

	return (
		<><Header bankTitle="Test" bankLogo={getCompletePathImage("icon-48x48.png")} /><div className="App">HOME PAGE</div><Footer /></>
	);	
}
export default HomePage;
