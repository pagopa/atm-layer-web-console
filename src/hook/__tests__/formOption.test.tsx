import { fireEvent, render, screen } from "@testing-library/react";
import formOption from "../formOption";
import { ASSOCIATE_BPMN, CREATE_BPMN, CREATE_RES, CREATE_WR, DELETE_BPMN, DEPLOY_BPMN, DEPLOY_WR, ROLLBACK_WR, UPDATE_RES, UPDATE_WR, UPGRADE_BPMN } from "../../commons/constants";

describe("formOption Test", () => {
    const { getFormOptions } = formOption();
    
    test("test get values", () =>{
        let allFormOptions = [];
        const allOptions = [CREATE_BPMN, DEPLOY_BPMN, DELETE_BPMN, UPGRADE_BPMN, ASSOCIATE_BPMN, CREATE_RES, UPDATE_RES, CREATE_WR, DEPLOY_WR, ROLLBACK_WR, UPDATE_WR,""];
        allOptions.map(e => allFormOptions.push(getFormOptions(e)));
        expect(allFormOptions.length).toBe(12);
    });
});