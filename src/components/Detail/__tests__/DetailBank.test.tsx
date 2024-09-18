import React from "react";
import { render } from "@testing-library/react";
import DetailBank from "../DetailBank";
import DetailBody from "../DetailBody";

jest.mock("../DetailBody", () => jest.fn(() => <div>Mocked DetailBody</div>));

describe("DetailBank component", () => {
  const mockDetailFields = { field1: "value1", field2: "value2" };
  const mockDetailTitle = "Bank Detail Title";
  const mockBreadComponent = <div>Breadcrumb Component</div>;
  const mockDetail = {
    bankId: "mocked-bank-id",
    bankName: "Mocked Bank Name",
  };

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem("recordParamsBank", JSON.stringify(mockDetail));

    (DetailBody as jest.Mock).mockClear();
  });

  test("renders DetailBody with correct detail prop", () => {
    render(
      <DetailBank
        detailFields={mockDetailFields}
        detailTitle={mockDetailTitle}
        breadComponent={mockBreadComponent}
      />
    );

    expect(DetailBody).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: mockDetail,
        driver: "banks",
        detailFields: mockDetailFields,
        detailTitle: mockDetailTitle,
        breadComponent: mockBreadComponent,
      }),
      expect.anything()
    );
  });
});
