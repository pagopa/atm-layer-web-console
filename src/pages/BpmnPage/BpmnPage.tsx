/* eslint-disable indent */
import { Box } from "@mui/material";
import { useContext, useState } from "react";
import SideBar from "../../components/Menu/SideBar";
import { Ctx } from "../../DataContext";
import { BpmnDto } from "../../model/BpmnModel";
import formOption from "../../hook/formOption";
import NewBpmn from "./Forms/NewBpmn";
import UpgradeBpmn from "./Forms/UpgradeBpmn";
import DeployBpmn from "./Forms/DeployBpmn";
import AssociateBpmn from "./Forms/AssociateBpmn";
import DeleteBpmn from "./Forms/DeleteBpmn";
import Form from "./Forms/Form";

const BpmnPage = () => {
    const { headerHeight } = useContext(Ctx);
const { getFormOptions } = formOption();

    const initialValues: BpmnDto = {
		file: undefined,
		fileName: undefined,
		functionType: undefined,
	};

	const [formData, setFormData] = useState<BpmnDto>(initialValues);
	const [errors, setErrors] = useState(initialValues);

    const validateForm = () => {
		const newErrors = {
			file: formData.file ? "" : "Campo obbligatorio",
			fileName: formData.fileName ? "" : "Campo obbligatorio",
			functionType: formData.functionType ? "" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			console.log("VALUES:", formData);
		}
	};
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
                    
                    <Form handleSubmit={handleSubmit} getFormOptions={getFormOptions("Create")} >
                        <NewBpmn formData={formData} setFormData={setFormData} errors={errors}/>
                    </Form>
                     
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