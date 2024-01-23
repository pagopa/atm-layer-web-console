/* eslint-disable indent */
import { Box } from "@mui/material";
import { useContext } from "react";
import { Ctx } from "../DataContext";
import NewBpmn from "../components/FormComponents/FormsBpmn/NewBpmn";
import UpgradeBpmn from "../components/FormComponents/FormsBpmn/UpgradeBpmn";
import AssociateBpmn from "../components/FormComponents/FormsBpmn/AssociateBpmn";
import DeleteBpmn from "../components/FormComponents/FormsBpmn/DeleteBpmn";
import DeployBpmn from "../components/FormComponents/FormsBpmn/DeployBpmn";

const BpmnPage = () => {
    const { headerHeight } = useContext(Ctx);

    return (
        <Box
            display="flex"
            flexDirection="column"
        >
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
                    <DeployBpmn />
                    <UpgradeBpmn />
                    <AssociateBpmn />
                    <DeleteBpmn />
                </Box>
            </Box>
        </Box>
    );
};

export default BpmnPage;