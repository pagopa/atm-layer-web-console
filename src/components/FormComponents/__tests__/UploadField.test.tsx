import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UploadField from "../UploadField";

const mockSetFormData = jest.fn();
const mockClearFile = jest.fn();

const defaultProps = {
  name: "test-file",
  titleField: "Test File Upload",
  file: undefined,
  clearFile: mockClearFile,
  error: "",
  setFormData: mockSetFormData,
  formData: {},
  allowedFile: "*",
};

describe("UploadField Component", () => {
  test("should render the UploadFileWithButton component and handle file upload", () => {
    render(<UploadField {...defaultProps} />);

    expect(screen.getByText("Test File Upload")).toBeInTheDocument();

    const file = new File(["file content"], "test-file.txt", { type: "text/plain" });
    const fileInput = screen.getByTestId("hidden-input");
    
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockSetFormData).toHaveBeenCalledWith({
      ...defaultProps.formData,
      file,
      filename: "test-file"
    });
  });

  test("should render without titleField", () => {
    const propsWithoutTitle = { ...defaultProps, titleField: undefined };
    render(<UploadField {...propsWithoutTitle} />);

    expect(screen.queryByText("Test File Upload")).not.toBeInTheDocument();
  });
});
