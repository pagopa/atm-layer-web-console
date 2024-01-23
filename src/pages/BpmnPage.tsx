/* eslint-disable indent */
import { Box } from "@mui/material";
import { useContext } from "react";
import { Ctx } from "../DataContext";
import NewBpmn from "../components/FormComponents/FormsBpmn/NewBpmn";
import UpgradeBpmn from "../components/FormComponents/FormsBpmn/UpgradeBpmn";
import DeployBpmn from "../components/FormComponents/FormsBpmn/DeployBpmn";
import AssociateBpmn from "../components/FormComponents/FormsBpmn/AssociateBpmn";
import DeleteBpmn from "../components/FormComponents/FormsBpmn/DeleteBpmn";

const BpmnPage = () => {
    const { headerHeight } = useContext(Ctx);

    // const initialValues: BpmnDto = {
	// 	file: undefined,
	// 	fileName: undefined,
	// 	functionType: undefined,
	// };

	// const [formData, setFormData] = useState();
	// const [errors, setErrors] = useState();

    // const validateForm = () => {
	// 	const newErrors = {
	// 		file: formData.file ? "" : "Campo obbligatorio",
	// 		fileName: formData.fileName ? "" : "Campo obbligatorio",
	// 		functionType: formData.functionType ? "" : "Campo obbligatorio",
	// 	};

	// 	setErrors(newErrors);

	// 	// Determines whether all the members of the array satisfy the conditions "!error".
	// 	return Object.values(newErrors).every((error) => !error);
	// };

	// const handleSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	if (validateForm()) {
	// 		console.log("VALUES:", formData);
	// 	}
	// };



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