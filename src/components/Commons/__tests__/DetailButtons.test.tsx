import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import DetailButtons from "../../Detail/DetailButtons";

describe("DetailButtons", () => {
  const setType = jest.fn();
  const openDialog = jest.fn();

  const buttonConfigs = [
    {
      text: "Action 1",
      action: "action1",
      navigate: "/route1",
      disabledCondition: () => false
    },
    {
      text: "Action 2",
      action: "action2",
      navigate: "/route2",
      disabledCondition: () => true
    }
  ];

  test("renders buttons with correct text", () => {
    render(
        <Ctx.Provider value={useNavigate}>
            <BrowserRouter>
                <DetailButtons
                        setType={setType}
                        openDialog={openDialog}
                        buttonConfigs={buttonConfigs} detail={undefined}     
                />
            </BrowserRouter>
        </Ctx.Provider>
    );

    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  test("calls setType and openDialog when button is clicked", () => {
    render(
        <Ctx.Provider value={useNavigate}>
            <BrowserRouter>
                <DetailButtons
                        setType={setType}
                        openDialog={openDialog}
                        buttonConfigs={buttonConfigs} detail={undefined}     
                />
            </BrowserRouter>
        </Ctx.Provider>
    );

    fireEvent.click(screen.getByText("Action 1"));

    expect(setType).toHaveBeenCalledWith("action1");
    expect(openDialog).toHaveBeenCalledWith("action1");
  });

  test("navigates to correct route when navigate property is provided", () => {
    render(
        <Ctx.Provider value={useNavigate}>
            <BrowserRouter>
                <DetailButtons
                        setType={setType}
                        openDialog={openDialog}
                        buttonConfigs={buttonConfigs} detail={undefined}     
                />
            </BrowserRouter>
        </Ctx.Provider>
    );

    fireEvent.click(screen.getByText("Action 1"));

    expect(window.location.pathname).toBe("/route1");
  });

  test("disables button when disabledCondition is true", () => {
    render(
        <Ctx.Provider value={useNavigate}>
            <BrowserRouter>
                <DetailButtons
                        setType={setType}
                        openDialog={openDialog}
                        buttonConfigs={buttonConfigs} detail={undefined}     
                />
            </BrowserRouter>
        </Ctx.Provider>
    );

    const action2Button = screen.getByText("Action 2");

    expect(action2Button).toBeDisabled();
  });

  test("does not call setType, openDialog, or navigate when button is clicked and disabledCondition is true", () => {
    render(
      <Ctx.Provider value={useNavigate}>
        <BrowserRouter>
          <DetailButtons
            setType={setType}
            openDialog={openDialog}
            buttonConfigs={buttonConfigs} 
            detail={undefined}     
          />
        </BrowserRouter>
      </Ctx.Provider>
    );
  
    fireEvent.click(screen.getByText("Action 2"));
  
    expect(setType).not.toHaveBeenCalled();
    expect(openDialog).not.toHaveBeenCalled();
    expect(window.location.pathname).not.toBe("/route2");
  });

  test("does not navigate when navigate property is not provided", () => {
    const buttonConfigsNoNavigate = [
      {
        text: "Action 3",
        action: "action3",
        disabledCondition: () => false
      }
    ];
  
    render(
      <Ctx.Provider value={useNavigate}>
        <BrowserRouter>
          <DetailButtons
            setType={setType}
            openDialog={openDialog}
            buttonConfigs={buttonConfigsNoNavigate} 
            detail={undefined}     
          />
        </BrowserRouter>
      </Ctx.Provider>
    );
  
    fireEvent.click(screen.getByText("Action 3"));
  
    expect(window.location.pathname).toBe("/route1");
  });
    
  test("does not call setType, openDialog, or navigate when button is clicked and disabledCondition is not provided", () => {
    const buttonConfigsNoDisabledCondition = [
      {
        text: "Action 4",
        action: "action4",
        navigate: "/route4"
      }
    ];
  
    render(
      <Ctx.Provider value={useNavigate}>
        <BrowserRouter>
          <DetailButtons
            setType={setType}
            openDialog={openDialog}
            buttonConfigs={buttonConfigsNoDisabledCondition} 
            detail={undefined}     
          />
        </BrowserRouter>
      </Ctx.Provider>
    );
  
    fireEvent.click(screen.getByText("Action 4"));
  
    expect(setType).toHaveBeenCalledWith("action4");
    expect(openDialog).toHaveBeenCalledWith("action4");
    expect(window.location.pathname).toBe("/route4");
  });
  
});
