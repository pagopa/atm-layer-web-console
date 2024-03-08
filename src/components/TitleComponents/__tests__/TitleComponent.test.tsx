import { render, screen } from '@testing-library/react';
import { TitleComponent } from '../TitleComponent';

describe("HomePageTitle", () => {

    test("Check for HomePageTitle", () => {
        render(<TitleComponent title="Test Title" subTitle="Test SubTitle" />);
        const titleComponentElement = screen.getByText("Test Title");
        const SubTitleElement = screen.getByText("Test SubTitle");
        expect(titleComponentElement).toBeInTheDocument();
        expect(SubTitleElement).toBeInTheDocument();
      });
})