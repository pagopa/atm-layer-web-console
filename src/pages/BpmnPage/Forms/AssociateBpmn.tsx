/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { EditNote as EditNoteIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { RemoveCircleOutline } from "@mui/icons-material";
import { TitleComponent } from "../../../components/TitleComponents/TitleComponent";
import { AssociateBpmnBodyDto, AssociateBpmnDto, BranchConfigDto, TerminalDto } from "../../../model/BpmnModel";
import { isValidUUID } from "../../../utils/Commons";

export const AssociateBpmn = () => {
    const theme = useTheme();

    const initialValues: AssociateBpmnDto = {
        acquirerId: undefined,
        functionType: undefined,
        body: {
            defaultTemplateId: undefined,
            defaultTemplateVersion: undefined,
            branchesConfigs: undefined
        }
    };

    const branchesInitialValues: BranchConfigDto = {
        branchId: undefined,
        branchDefaultTemplateId: undefined,
        branchDefaultTemplateVersion: undefined,
        terminals: undefined
    };

    const terminalsInitialValues: TerminalDto = {
        templateId: undefined,
        templateVersion: undefined,
        terminalIds: undefined
    };

    const initialTerminalErrors = {
        templateId: "",
        templateVersion: "",
        terminalIds: [""],
    };

    const initialBranchesConfigErrors = {
        branchId: "",
        branchDefaultTemplateId: "",
        branchDefaultTemplateVersion: "",
        terminals: [initialTerminalErrors]
    };

    const initialErrors = {
        acquirerId: "",
        functionType: "",
        body: {
            defaultTemplateId: "",
            defaultTemplateVersion: "",
            branchesConfigs: [{ ...initialBranchesConfigErrors }],
        }
    };

    const [formData, setFormData] = useState<AssociateBpmnDto>(initialValues);
    const [errors, setErrors] = useState({ ...initialErrors });

    const inputGroupStyle = {
        borderRadius: 1,
        border: 1,
        borderColor: theme.palette.divider,
        p: 3,
        mb: 3,
        width: "50%",
    };

    const validateForm = () => {
        const newErrors = {
            acquirerId: formData.acquirerId ? (isValidUUID(formData.acquirerId) ? "" : "uuid non valido") : "Campo obbligatorio",
            functionType: formData.functionType ? "" : "Campo obbligatorio",
            body: {
                defaultTemplateId: formData.body?.defaultTemplateId ? (isValidUUID(formData.body?.defaultTemplateId) ? "" : "uuid non valido") : "Campo obbligatorio",
                defaultTemplateVersion: formData.body?.defaultTemplateVersion ? "" : "Campo obbligatorio",
                branchesConfigs: formData.body?.branchesConfigs ?
                    formData.body?.branchesConfigs.map((branch) => ({
                        branchId: branch && typeof branch.branchId !== "undefined" ? "" : "Campo obbligatorio",
                        branchDefaultTemplateId: branch?.branchDefaultTemplateId ?
                            (isValidUUID(branch.branchDefaultTemplateId) ? "" : "uuid non valido")
                            : "Campo obbligatorio",
                        branchDefaultTemplateVersion: branch?.branchDefaultTemplateVersion ? "" : "Campo obbligatorio",
                        terminals: branch?.terminals ? branch.terminals.map((terminal) => ({
                            templateId: terminal?.templateId ? (isValidUUID(terminal.templateId) ? "" : "uuid non valido") : "CampoObbligatorio",
                            templateVersion: terminal?.templateVersion ? "" : "Campo obbligatorio",
                            terminalIds: terminal?.terminalIds ? terminal.terminalIds.map((id) => (id ? "" : "Campo obbligatorio")) : [""]
                        })) : [{ ...initialTerminalErrors }]
                    })

                    ) : [{ ...initialBranchesConfigErrors }],
            }
        };

        setErrors(newErrors);

        console.log("ERRORS", errors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("VALUES:", formData);
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleBranchChange = (index: number, field: string, value: string | number) => {
        setFormData((prevData) => {
            const updatedBranches = [...prevData.body?.branchesConfigs || []];
            // eslint-disable-next-line functional/immutable-data
            updatedBranches[index] = {
                ...updatedBranches[index],
                [field]: value,
            };

            return {
                ...prevData,
                body: {
                    ...prevData.body,
                    branchesConfigs: updatedBranches,
                },
            };
        });
    };

    const addBranches = () => {
        setFormData({
            ...formData,
            body: {
                ...formData.body,
                branchesConfigs: [
                    ...(formData.body?.branchesConfigs || []),
                    {
                        ...branchesInitialValues,
                        branchId: undefined
                    }
                ],
            },
        });
    };

    const removeBranches = (index: number) => {
        setFormData((prevData) => {
            const updatedBranches = [...prevData.body?.branchesConfigs || []];
            // eslint-disable-next-line functional/immutable-data
            updatedBranches.splice(index, 1);

            return {
                ...prevData,
                body: {
                    ...prevData.body,
                    branchesConfigs: updatedBranches,
                },
            };
        });
    };

    const addTerminal = (branchIndex: number, newTerminal: TerminalDto) => {
        setFormData((prevData) => {
            const updatedBranches = (prevData.body?.branchesConfigs || []).map((branch, index) => {
                if (index === branchIndex) {
                    return {
                        ...branch,
                        terminals: [...(branch.terminals || []), newTerminal]
                    };
                }
                return branch;
            });

            return {
                ...prevData,
                body: {
                    ...prevData.body,
                    branchesConfigs: updatedBranches,
                },
            };
        });
    };




    const removeTerminal = (branchIndex: number, terminalIndex: number) => {
        setFormData((prevData) => ({
            ...prevData,
            body: {
                ...prevData.body,
                branchesConfigs: (prevData.body?.branchesConfigs || []).map((branch, i) =>
                    i === branchIndex
                        ? {
                            ...branch,
                            terminals: branch.terminals?.filter((_terminal, termIndex) => termIndex !== terminalIndex)
                        }
                        : branch
                )
            }
        }));
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={"100vw"}
        >
            <Box marginTop={3} textAlign={"center"}>
                <TitleComponent title={"Associa BPMN"} subTitle={""} />
            </Box>
            <Box sx={inputGroupStyle} mt={4}>
                <form onSubmit={handleSubmit}>branchIndex
                    <Grid container spacing={2}>
                        <Grid container item>
                            <EditNoteIcon sx={{ mr: 1 }} />
                            <Typography variant="body1" fontWeight="600">
                                Compila tutti i campi per Associare un BPMN
                            </Typography>
                        </Grid>
                        <Grid container item my={1}>
                            <TextField
                                fullWidth
                                id="acquirerId"
                                name="acquirerId"
                                label={"Codice identificativo banca"}
                                placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                                size="small"
                                value={formData.acquirerId}
                                onChange={(e) => handleInputChange("acquirerId", e.target.value)}
                                error={Boolean(errors.acquirerId)}
                                helperText={errors.acquirerId}
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
                                value={formData.functionType}
                                onChange={(e) => handleInputChange("functionType", e.target.value)}
                                error={Boolean(errors.functionType)}
                                helperText={errors.functionType}
                            />
                        </Grid>
                        <Grid container item my={1}>
                            <TextField
                                fullWidth
                                id="defaultTemplateId"
                                name="defaultTemplateId"
                                label={"Identificatore univoco Bmpn di default"}
                                placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                                size="small"
                                value={formData.body?.defaultTemplateId}
                                onChange={(e) => handleInputChange("defaultTemplateId", e.target.value)}
                                error={Boolean(errors.body.defaultTemplateId)}
                                helperText={errors.body.defaultTemplateId}
                            />
                        </Grid>
                        <Grid container item my={1}>
                            <TextField
                                fullWidth
                                id="defaultTemplateVersion"
                                name="defaultTemplateVersion"
                                label={"Versione Bmpn di default"}
                                placeholder={"Versione Bmpn di default"}
                                size="small"
                                type="number"
                                value={formData.body?.defaultTemplateVersion}
                                onChange={(e) => handleInputChange("defaultTemplateVersion", parseInt(e.target.value, 10))}
                                error={Boolean(errors.body.defaultTemplateVersion)}
                                helperText={errors.body.defaultTemplateVersion}
                            />
                        </Grid>
                        <Grid container item mb={1}>
                            <Button variant="text" size="small" onClick={() => addBranches()}>
                                Aggiungi branches
                            </Button>
                        </Grid>
                        <Grid container item my={1}>
                            {
                                formData.body && formData.body.branchesConfigs ?
                                    formData.body.branchesConfigs.map((branch, branchIndex) => (
                                        <Box key={branchIndex} display={"flex"} flexDirection={"row"} width={"100%"}>
                                            <RemoveCircleOutline
                                                color="error"
                                                sx={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => removeBranches(branchIndex)}
                                                key={`icon${branchIndex}`} />
                                            <Box display="flex"
                                                flexDirection="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{
                                                    borderRadius: 1,
                                                    border: 1,
                                                    borderColor: theme.palette.divider,
                                                    p: 3,
                                                    mb: 3,
                                                    width: "-webkit-fill-available"
                                                }}
                                                ml={2}
                                                key={`box${branchIndex}`}
                                            >
                                                {branch && (
                                                    <>
                                                        <Grid container item my={1} key={`branchId${branchIndex}`}>
                                                            <TextField
                                                                fullWidth
                                                                id="branchId"
                                                                name="branchId"
                                                                label={"Branch Id"}
                                                                placeholder={"Branch Id"}
                                                                size="small"
                                                                value={branch.branchId}
                                                                onChange={(e) => handleBranchChange(branchIndex, "branchId", e.target.value)} />
                                                        </Grid>
                                                        <Grid container item my={1} key={`branchDefaultTemplateId${branchIndex}`}>
                                                            <TextField
                                                                fullWidth
                                                                id="branchDefaultTemplateId"
                                                                name="branchDefaultTemplateId"
                                                                label={"Identificatore univoco di default del Branch"}
                                                                placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                                                                size="small"
                                                                value={branch.branchDefaultTemplateId}
                                                                onChange={(e) => handleBranchChange(branchIndex, "branchDefaultTemplateId", e.target.value)}
                                                            />
                                                        </Grid>
                                                        <Grid container item my={1} key={`branchDefaultTemplateVersion${branchIndex}`}>
                                                            <TextField
                                                                fullWidth
                                                                id="branchDefaultTemplateVersion"
                                                                name="branchDefaultTemplateVersion"
                                                                label={"Versione branchDefaultTemplate di default"}
                                                                placeholder={"Versione branchDefaultTemplate di default"}
                                                                size="small"
                                                                type="number"
                                                                value={branch.branchDefaultTemplateVersion}
                                                                onChange={(e) => handleBranchChange(branchIndex, "branchDefaultTemplateVersion", parseInt(e.target.value, 10))}
                                                            />
                                                        </Grid>
                                                        <Grid container item mb={1}>
                                                            <Button variant="text" size="small" onClick={() => addTerminal(branchIndex, terminalsInitialValues)}>
                                                                Aggiungi terminals
                                                            </Button>
                                                        </Grid>
                                                        {
                                                            formData.body &&
                                                            formData.body.branchesConfigs &&
                                                            formData.body.branchesConfigs[branchIndex] &&
                                                            formData.body.branchesConfigs[branchIndex]?.terminals?.map((terminal, terminalIndex) => (
                                                                <Box key={branchIndex} display={"flex"} flexDirection={"row"} width={"100%"}>
                                                                    <RemoveCircleOutline
                                                                        color="error"
                                                                        sx={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={() => removeTerminal(branchIndex, terminalIndex)}
                                                                        key={`iconT${terminalIndex}`} />
                                                                    <Box display="flex"
                                                                        flexDirection="column"
                                                                        justifyContent="center"
                                                                        alignItems="center"
                                                                        sx={{
                                                                            borderRadius: 1,
                                                                            border: 1,
                                                                            borderColor: theme.palette.divider,
                                                                            p: 3,
                                                                            mb: 3,
                                                                            width: "-webkit-fill-available"
                                                                        }}
                                                                        ml={2}
                                                                        key={`boxT${terminalIndex}`}
                                                                    >
                                                                        <Grid container item my={1} key={`templateId${terminalIndex}`}>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="templateId"
                                                                                name="templateId"
                                                                                label={"Identificatore univoco template"}
                                                                                placeholder={"Es: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                                                                                size="small"
                                                                                value={terminal.templateId}
                                                                                onChange={(e) => e.target.value}
                                                                            />
                                                                        </Grid>
                                                                        <Grid container item my={1} key={`templateVersion${terminalIndex}`}>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="templateVersion"
                                                                                name="templateVersion"
                                                                                label={"Versione Template"}
                                                                                placeholder={"Versione branchDefaultTemplate di default"}
                                                                                size="small"
                                                                                type="number"
                                                                                value={terminal.templateVersion}
                                                                                onChange={(e) => e.target.value}
                                                                            />
                                                                        </Grid>
                                                                    </Box>
                                                                </Box>
                                                            ))
                                                        }
                                                    </>
                                                )}
                                            </Box>
                                        </Box>
                                    )) : null
                            }
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AssociateBpmn;
