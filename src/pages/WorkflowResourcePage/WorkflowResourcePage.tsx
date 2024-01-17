import { Box } from "@mui/material";
import { useContext } from "react";
import SideBar from "../../components/Menu/SideBar";
import { Ctx } from "../../DataContext";
import CreateWR from "./Forms/CreateWR";
import UpdateWR from "./Forms/UpdateWR";
import DeployWR from "./Forms/DeployWR";
import RollbackWR from "./Forms/RollbackWR";


const WorkflowResourcePage = () => {
	const { headerHeight } = useContext(Ctx);

	return (
		<Box
			display="flex"
			flexDirection="row"
		>
			<SideBar name={"Workflow Resource"} />
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				width={"85vw"}
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