/* eslint-disable indent */
import { Box } from "@mui/system";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Paper, Grid, TextField, Typography, useTheme, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import { Ctx } from "../../../DataContext";
import SideBar from "../../../components/Menu/SideBar";
import UploadFileWithButton from "../UploadFileWithButton";


export type BpmnDto = {
    file: string;
    fileName: string;
    functionType: string;
};

const UpgradeBpmn = () => {
    const navigate = useNavigate();
    const { interfaceType } = useContext(Ctx);
    const theme = useTheme();

    const initialValues = {
        file: "",
        fileName: "",
        functionType: ""
    };

    const inputGroupStyle = {
        borderRadius: 1,
        border: 1,
        borderColor: theme.palette.divider,
        p: 3,
        mb: 3,
        width: "50%"
    };

    const validate = (values: BpmnDto) => Object.fromEntries(
        Object.entries({
            file: !values.file
                ? "Campo obbligatorio"
                : undefined,
            fileName: !values.fileName
                ? "Campo obbligatorio"
                : undefined,
            functionType: !values.functionType
                ? "Campo obbligatorio"
                : undefined,
        }).filter(([_key, value]) => value)
    );

    const formik = useFormik<BpmnDto>({
        initialValues,
        validate,
        onSubmit: (values) => console.log("VALUES: ", values),
        enableReinitialize: true,
        validateOnMount: true,
        validateOnBlur: true,
        validateOnChange: true,
    });

    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        formik.setFieldValue("file", e.target.value);
    };

    const clearFile = () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        formik.setFieldValue("file", "");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={"85vw"}
        >
        <Box marginTop={3} textAlign={"center"}>
                <TitleComponent
                    title={"Creazione BPMN"}
                    subTitle={""}
                />
            </Box>
            <Box sx={inputGroupStyle} mt={4}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid container item>
                            <EditNoteIcon sx={{ mr: 1 }} />
                            <Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per creare un nuovo BPMN
                            </Typography>
                        </Grid>
                        <Grid container item>
                            <Typography variant="body1">
                                File BPMN
                            </Typography>
                            <UploadFileWithButton
                                name={"file"}
                                file={formik.values.file}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => changeFile(e)}
                                onClick={clearFile}
                                error={formik.touched.file && Boolean(formik.errors.file)}
                            />
                        </Grid>
                        <Grid container item my={1}>
                            <TextField
                                fullWidth
                                id="fileName"
                                name="fileName"
                                label={"Nome del file"}
                                placeholder={"Nome del file"}
                                size="small"
                                value={formik.values.fileName}
                                onChange={(e) => formik.handleChange(e)}
                                error={formik.touched.fileName && Boolean(formik.errors.fileName)}
                                helperText={formik.touched.fileName && formik.errors.fileName}
                            />
                        </Grid>
                        <Grid container item my={1}>
                            <TextField
                                fullWidth
                                id="functionType"
                                name="functionType"
                                label={"Tipo di funzione"}
                                placeholder={"Tipo di funzione"}
                                size="small"
                                value={formik.values.functionType}
                                onChange={(e) => formik.handleChange(e)}
                                error={formik.touched.functionType && Boolean(formik.errors.functionType)}
                                helperText={formik.touched.functionType && formik.errors.functionType}
                            />
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" mt={2} >
                        <Button variant="contained" onClick={() => formik.handleSubmit()}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default UpgradeBpmn;
