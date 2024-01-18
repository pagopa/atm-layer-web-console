/* eslint-disable indent */
import { Box } from "@mui/material";
import { useContext } from "react";
import SideBar from "../../components/Menu/SideBar";
import { Ctx } from "../../DataContext";
import NewBpmn from "./Forms/NewBpmn";
import UpgradeBpmn from "./Forms/UpgradeBpmn";
import DeployBpmn from "./Forms/DeployBpmn";
import AssociateBpmn from "./Forms/AssociateBpmn";
import DeleteBpmn from "./Forms/DeleteBpmn";

const BpmnPage = () => {
    const { headerHeight } = useContext(Ctx);

    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            {/* <SideBar name={"BPMN"} /> */}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width={"100vm"}
            >
                <Box
                    alignItems="center"
                    sx={{
                        maxHeight: `calc(100vh - ${headerHeight}px)`, // Sottrai l'altezza dell'header dall'altezza massima
                        overflowY: "auto",
                        mr: "14px"
                    }}>
                    <NewBpmn />
                    <UpgradeBpmn />
                    <DeployBpmn />
                    <AssociateBpmn />
                    <DeleteBpmn />
                </Box>

            </Box>
        </Box>
    );
};

export default BpmnPage;