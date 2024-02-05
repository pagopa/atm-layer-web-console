import { Box, Button } from "@mui/material";

const ActionsBox = () => (
	<Box>
		<Button
			sx={{ marginRight: 3 }}
			variant="contained" 
			onClick={() => console.log("Associazione")}>
								Associa
		</Button>
		<Button 
			sx={{ marginRight: 3 }}
			variant="contained" 
			onClick={() => console.log("Upgrade")}>
								Upgrade
		</Button>
		<Button 
			sx={{ marginRight: 3 }}
			variant="contained" 
			onClick={() => console.log("Deploy")}>
								Deploy
		</Button>
		<Button 
			sx={{ marginRight: 3 }}
			variant="contained" 
			onClick={() => console.log("Delete")}>
								Delete
		</Button>
		<Button 
			variant="contained" 
			onClick={() => console.log("Download")}>
								Download
		</Button>
	</Box>
);

export default ActionsBox;