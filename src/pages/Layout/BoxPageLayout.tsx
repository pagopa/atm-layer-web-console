import { Box, useTheme } from "@mui/material";

type Props= {
    shadow?:boolean;
    px?:number;
    py?:number;
    mx?:number;
    my?:number;
	children: React.ReactNode;
};
export default function BoxPageLayout({shadow=false,px=5, py=0, mx=0, my=5, children}:Props) {
	const theme=useTheme();
	return (
		<Box 
			display="flex"
			flexDirection="column"
			my={my}
			mx={mx}
			py={py}
			px={px}
			sx={{boxShadow: shadow? theme.shadows[4]:"none"}}
		>
			{children}
		</Box>
	);
}
