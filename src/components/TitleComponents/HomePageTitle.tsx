import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useContext } from "react";
import { themeApp } from "../../assets/jss/themeApp";
import { Ctx } from "../../DataContext";

type Props = {
    title: string;
    subTitle: string;
};

export const HomePageTitle = ({ title, subTitle }: Props) => {
	const {theme} = useContext(Ctx);
	
	return(
		<React.Fragment>
			<Grid item xs={12}>
				<Box p={1}>
					<Typography variant="h2" textAlign="center" noWrap>
						{title}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6" textAlign="center" noWrap>
					{subTitle}
				</Typography>
			</Grid>
		</React.Fragment>
	);
};