/* eslint-disable indent */
import { Box } from "@mui/material";
import { useContext } from "react";
import SideBar from "../../components/Menu/SideBar";
import { Ctx } from "../../DataContext";
import NewBpmn from "./Forms/NewBpmn";
import UpgradeBpmn from "./Forms/UpgradeBpmn";

const BpmnPage = () => {
    const { headerHeight } = useContext(Ctx);

    return (
        <Box
            display="flex"
            flexDirection="row"
        >
            <SideBar name={"BPMN"} />
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
                    <NewBpmn />
                    <UpgradeBpmn />
                </Box>

            </Box>
        </Box>
    );
};

/* const [checked, setChecked] = useState([0]);

const handleToggle = (value: number) => () => {
    const currentIndex = checked?.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        // eslint-disable-next-line functional/immutable-data
        newChecked.push(value);
    } else {
        // eslint-disable-next-line functional/immutable-data
        newChecked.splice(currentIndex, 1);
    }
}; */



export default BpmnPage;