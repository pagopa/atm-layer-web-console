import { render } from "@testing-library/react";
import BreadCrumb from "../Breadcrumb";

describe("BreadCrumb Component", () => {
  test("renders the correct breadcrumbs", () => {
    const { getByLabelText } = render(
      <BreadCrumb breadcrumb={["Home", "About", "Contact"]} mb={2} />
    );

    const breadcrumbElement = getByLabelText("breadcrumb");
    expect(breadcrumbElement).toBeInTheDocument();
  });
});
