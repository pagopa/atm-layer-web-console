import { base64_decode, base64_encode, downloadFile, downloadStaticFile } from "../decode";

const mockCreateObjectURL = jest.fn();
(global as any).URL.createObjectURL = mockCreateObjectURL;

describe("decode file test", () => {
  test("Test base64_decode function", () => {
    const base64String = "VGhpcyBpcyBhIHRlc3QgYmFzZTY0IHN0cmluZw==";
    const expectedResult = "This is a test base64 string";
    expect(base64_decode(base64String)).toEqual(expectedResult);
  });

  test("Test base64_encode function", () => {
    const plainText = "This is a test string";
    const expectedResult = "VGhpcyBpcyBhIHRlc3Qgc3RyaW5n";
    expect(base64_encode(plainText)).toEqual(expectedResult);
  });
  
  test("download a file successfully", () => {
   
    const doc = "VGhpcyBpcyBhIHRlc3QgZmlsZSBvciBhcHBsaWNhdGlvbiBkZXNrdG9w";
    const type = "text/plain";
    const docName = "testFile";
    const extension = "txt";

    downloadFile(doc, type, docName, extension);

    
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
  });

  test("download file doc null", () => {
    
    const doc = null;

    
    const mockCreateObjectURL = jest.fn();
    const mockRevokeObjectURL = jest.fn();
    URL.createObjectURL = mockCreateObjectURL;
    URL.revokeObjectURL = mockRevokeObjectURL;

    
    downloadFile(doc, "text/plain", "testFile", "txt");


    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(mockRevokeObjectURL).not.toHaveBeenCalled();
  });

  test("Test downloadStaticFile function", () => {
    
    const detail = { cdnUrl: "https://example.com/testFile.txt" };

    
    window.open = jest.fn();

    
    downloadStaticFile(detail);

    
    expect(window.open).toHaveBeenCalledWith(detail.cdnUrl, "_blank");
  });
});
