import { Typography, useTheme } from "@mui/material";

type Props = {
    title: string;
    subTitle: string;
};

export const HomePageTitle = ({ title, subTitle }: Props) => {

	const theme = useTheme();

	return (
		<>
			<Typography 
				variant="h1"
				color={"black"}> 
				{title} 
			</Typography>
			<Typography
				mt={1}
				variant="body2"
				noWrap
			>
				{subTitle}
			</Typography>
		</>
	);
};
