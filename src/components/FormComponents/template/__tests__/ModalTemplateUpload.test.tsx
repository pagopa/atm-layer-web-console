import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Ctx } from '../../../../DataContext';
import ModalTemplateUpload from '../ModalTemplateUpload';
import { UPDATE_RES, UPDATE_WR } from '../../../../commons/constants';

const originalFetch = global.fetch;
const recordParams = {
  uuid: '47d07cc0-ddc8-41f7-985c-772c5fb0ecfe',
  workflowResourceId: '47d07cc0-ddc8-41f7-985c-772c5fb0ecfe',
  resourceId: '47d07cc0-ddc8-41f7-985c-772c5fb0ecfe',
  cdnUrl: 'https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.bpmn',
  definitionKey: 'definitionKey',
};
const initialRecordParams = {
  uuid: '47d07cc0-ddc8-41f7-985c-772c5fb0ecfe',
  workflowResourceId: '47d07cc0-ddc8-41f7-985c-772c5fb0ecfe',
  resourceId: '47d07cc0-ddc8-41f7-985c-772c5fb0ecfe',
  cdnUrl: 'https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.bpmn',
  definitionKey: 'definitionKey',
};


beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  localStorage.setItem('recordParams', JSON.stringify(initialRecordParams));
});

afterEach(() => {
  global.fetch = originalFetch;
});

describe('ModalTemplateUpload Test', () => {
  const mockFormData = {
    file: new File(["file contents"], "test.bpmn", {
      type: "application/xml",
  })
  };

  
  const abortController = new AbortController();
  let setOpen = jest.fn();
  const setOpenSnackBar = jest.fn();
  const setSeverity = jest.fn();
  const setMessage = jest.fn();
  const setTitle = jest.fn();
  const mockHandleSnackbar = jest.fn();

  const renderModalTemplateUpload = (modalType: string) => {
    render(
      <Ctx.Provider value={{}}>
        <BrowserRouter>
          <ModalTemplateUpload
            type={modalType}
            titleModal="Test Title"
            contentText="Test Content Text"
            open={true}
            setOpen={setOpen}
            recordParams={recordParams}
            handleSnackbar={mockHandleSnackbar}
            abortController={abortController}
            setMessage={setMessage}
            setSeverity={setSeverity}
            setTitle={setTitle}
            setOpenSnackBar={setOpenSnackBar}
          />
        </BrowserRouter>
      </Ctx.Provider>
    );
  };

  
  test('Test ModalTemplateUpload case UPDATE_WR', () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          workflowResourceId: 'e2e4c79f-d2a3-4017-bf37-b465e01eedc4',
          deployedFileName: 'decisiontest16nov.DMN',
          definitionKey: 'Decision_2',
          status: 'DEPLOY_ERROR',
          sha256: 'aa601cbd9be5c3fd2a58507b2413bfd84e129a6e45edfd3f4ce48ae41ca4cdbf',
          enabled: true,
          definitionVersionCamunda: null,
          camundaDefinitionId: null,
          description: null,
          resourceFile: {
            id: '7939f971-8cb1-49b8-a2c6-2e83b8e40d1e',
            resourceType: 'DMN',
            storageKey:
              'WORKFLOW_RESOURCE/DMN/files/UUID/e2e4c79f-d2a3-4017-bf37-b465e01eedc4/decisiontest16nov.dmn',
            fileName: 'decisiontest16nov',
            extension: 'dmn',
            createdAt: '2023-11-16T14:05:32.115+00:00',
            lastUpdatedAt: '2024-03-04T14:07:24.490+00:00',
            createdBy: null,
            lastUpdatedBy: null,
          },
          resource: null,
          resourceType: 'DMN',
          deploymentId: null,
          createdAt: '2023-11-16T14:05:32.113+00:00',
          lastUpdatedAt: '2024-03-04T14:07:24.494+00:00',
          createdBy: null,
          lastUpdatedBy: null,
        }),
    });

    renderModalTemplateUpload(UPDATE_WR);

    const fileInput = screen.getByTestId('hidden-input');
    fireEvent.change(fileInput, { target: { files: [mockFormData.file] } });
    fireEvent.click(screen.getByText('Conferma'));
  });


  test('Test Check Error when UPDATE_WR', () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({}),
    });

    setOpen = jest.fn(() => {throw new Error()}); 
    renderModalTemplateUpload(UPDATE_WR);

    const fileInput = screen.getByTestId('hidden-input');
    fireEvent.change(fileInput, { target: { files: [mockFormData.file] } });
    fireEvent.click(screen.getByText('Conferma'));
  });


  test("Test clear button in UPDATE_WR", () => {
    renderModalTemplateUpload(UPDATE_WR);
    const fileInput = screen.getByTestId('hidden-input');
    fireEvent.change(fileInput, { target: { files: [mockFormData.file] } });
    fireEvent.click(screen.getByTestId('clear-upload-button'));
  });




  test('Test ModalTemplateUpload case UPDATE_RES', () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          resourceId: 'a6ce7654-1083-4ae5-8631-c4929a29ed01',
          sha256: 'a12393752006f1a73f70a9386113c63b6fb5ff150bca882197cedf90b14d7234',
          enabled: true,
          noDeployableResourceType: 'HTML',
          createdAt: '2023-11-16T15:48:02.563+00:00',
          lastUpdatedAt: '2024-03-04T13:27:48.229+00:00',
          createdBy: null,
          lastUpdatedBy: null,
          cdnUrl: 'https://d2xduy7tbgu2d3.cloudfront.net/files/HTML/aut.html',
          resourceFile: {
            id: '2ae36ede-8eea-47ed-8537-0d086d6064bf',
            resourceType: 'HTML',
            storageKey: 'RESOURCE/files/HTML/aut.html',
            fileName: 'aut',
            extension: 'html',
            createdAt: '2023-11-16T15:48:02.566+00:00',
            lastUpdatedAt: '2024-03-04T13:27:48.234+00:00',
            createdBy: null,
            lastUpdatedBy: null,
          },
          description: null,
        }),
    });

    renderModalTemplateUpload(UPDATE_RES);
    fireEvent.click(screen.getByText('Conferma'));
  });
  
  test('Test dialog close', () => {
    renderModalTemplateUpload(UPDATE_WR);
    fireEvent.click(screen.getByText('Annulla'));
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  test('Test dialog close', () => {
    renderModalTemplateUpload(UPDATE_RES);
    fireEvent.click(screen.getByText('Annulla'));
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  test('Test form validation', () => {
    renderModalTemplateUpload(UPDATE_WR);
    fireEvent.click(screen.getByText('Conferma'));
    expect(screen.getByText('Carica un file dal tuo computer')).toBeInTheDocument();
  });

  test('Test ModalTemplateUpload case UPDATE_RES', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          resourceId: 'a6ce7654-1083-4ae5-8631-c4929a29ed01',
          sha256: 'a12393752006f1a73f70a9386113c63b6fb5ff150bca882197cedf90b14d7234',
          enabled: true,
          noDeployableResourceType: 'HTML',
          createdAt: '2023-11-16T15:48:02.563+00:00',
          lastUpdatedAt: '2024-03-04T13:27:48.229+00:00',
          createdBy: null,
          lastUpdatedBy: null,
          cdnUrl: 'https://d2xduy7tbgu2d3.cloudfront.net/files/HTML/aut.html',
          resourceFile: {
            id: '2ae36ede-8eea-47ed-8537-0d086d6064bf',
            resourceType: 'HTML',
            storageKey: 'RESOURCE/files/HTML/aut.html',
            fileName: 'aut',
            extension: 'html',
            createdAt: '2023-11-16T15:48:02.566+00:00',
            lastUpdatedAt: '2024-03-04T13:27:48.234+00:00',
            createdBy: null,
            lastUpdatedBy: null,
          },
          description: null,
        }),
    });
  
    renderModalTemplateUpload(UPDATE_RES);
    const fileInput = screen.getByTestId('hidden-input');
    fireEvent.change(fileInput, { target: { files: [mockFormData.file] } });
    fireEvent.click(screen.getByText('Conferma'));
  });


  test('Test Check Error when UPDATE_RES', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({}),
    });

    setOpen = jest.fn(() => {throw new Error()});  
    renderModalTemplateUpload(UPDATE_RES);
    const fileInput = screen.getByTestId('hidden-input');
    fireEvent.change(fileInput, { target: { files: [mockFormData.file] } });
    fireEvent.click(screen.getByText('Conferma'));
  });

  test("Update with different file extensions should fail", () => {
    recordParams.cdnUrl = "https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.dmn";
    localStorage.setItem("recordParams", JSON.stringify(recordParams));
    renderModalTemplateUpload(UPDATE_RES);
    fireEvent.click(screen.getByText("Conferma"));
  });

  });
