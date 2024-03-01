import { fireEvent, render, screen } from '@testing-library/react';
import UploadFileWithButton from '../UploadFileWithButton';

describe("UploadFileWithButton", () => {
    
    const mockOnChange = jest.fn();
    const mockOnClick = jest.fn();
    const testFile = new File(["hello"], "hello.png", { type: "image/png" })


    test("Clear Uploaded File", () => {
        render(<UploadFileWithButton 
            name="Test Input Name"
            allowedType="image/png"
            file= {testFile}
            onChange= {mockOnChange}
            onClick= {mockOnClick} />);
        
        const clearButton = screen.getByTestId("clear-upload-button");
        expect(clearButton).toBeInTheDocument();
        fireEvent.click(clearButton);
        
        expect(mockOnClick).toHaveBeenCalled();
      });

    test("Upload Allowed File", () =>{
        render(<UploadFileWithButton 
            name="Test Input Name"
            allowedType="image/png"
            onChange= {mockOnChange}
            onClick= {mockOnClick} />);

        const clearButton = screen.queryByTestId("clear-upload-button");
        expect(clearButton).not.toBeInTheDocument();
        const inputFile = screen.getByTestId("hidden-input");
        expect(inputFile).toBeInTheDocument();
        fireEvent.change(inputFile);
        expect(mockOnChange).toHaveBeenCalled();
    });

    test("Uploaded File With Error", () => {
        render(<UploadFileWithButton 
            name ="Test Input Name"
            allowedType ="audio/*"
            file={testFile}
            onChange = {mockOnChange}
            onClick = {mockOnClick}
            error = "Test Error Message" />);

            const text = screen.getByRole('button');
            expect(text).toBeInTheDocument();
    });

    test("No File Uploaded With Error", () =>{
        render(<UploadFileWithButton 
            name="Test Input Name"
            allowedType="image/png"
            onChange= {mockOnChange}
            onClick= {mockOnClick}
            error = "Test Error Message" />);

        const clearButton = screen.queryByTestId("clear-upload-button");
        expect(clearButton).not.toBeInTheDocument();
        const inputFile = screen.getByTestId("hidden-input");
        expect(inputFile).toBeInTheDocument();
    });
})