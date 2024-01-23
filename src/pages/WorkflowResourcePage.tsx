import { Box } from "@mui/material";
import { useContext } from "react";
import { Ctx } from "../DataContext";
import CreateWR from "../components/FormComponents/FormsWorkflowResource/CreateWR";
import UpdateWR from "../components/FormComponents/FormsWorkflowResource/UpdateWR";
import DeployWR from "../components/FormComponents/FormsWorkflowResource/DeployWR";
import RollbackWR from "../components/FormComponents/FormsWorkflowResource/RollbackWR";


const WorkflowResourcePage = () => {
	const { headerHeight } = useContext(Ctx);

	return (
		<Box
			display="flex"
			flexDirection="row"
		>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				width={"100vw"}
			>
				<Box
					alignItems="center"
					sx={{
						maxHeight: `calc(100vh - ${headerHeight}px)`, // Sottrai l'altezza dell'header dall'altezza massima
						overflowY: "auto",
						mr: "14px"
					}}>
					<CreateWR />
					<UpdateWR />
					<DeployWR />
					<RollbackWR />
				</Box>
			</Box>
		</Box>
	);
};


export default WorkflowResourcePage;