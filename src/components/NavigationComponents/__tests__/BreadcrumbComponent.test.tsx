import { render, screen } from '@testing-library/react';
import BreadCrumb from '../BreadcrumbComponent';

describe("BreadcrumbComponent", () => {

    test("Check for breadcrumbs", () => {
        const breadcrumb = <div data-testid="breadcrumb">Breadcrumb</div>;
        render(<BreadCrumb breadcrumb={breadcrumb} mb={"4px"} />);
        const breadcrumbElement = screen.getByTestId("breadcrumb");
        expect(breadcrumbElement).toBeInTheDocument();
      });
})
