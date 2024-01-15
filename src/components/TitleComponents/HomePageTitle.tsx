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
				variant="headline"
				color={"black"}> 
				{title} 
			</Typography>
			<Typography
				mt={1}
				variant="body1"
				fontWeight={600}
				noWrap
			>
				{subTitle}
			</Typography>
		</>
	);
};
