import { render, screen } from '@testing-library/react';
import { HomePageTitle } from '../HomePageTitle';

describe("HomePageTitle", () => {

    test("Check for HomePageTitle", () => {
        render(<HomePageTitle title="Test Title" subTitle="Test SubTitle" />);
        const homePageTitleElement = screen.getByText("Test Title");
        const homePageSubTitleElement = screen.getByText("Test SubTitle");
        expect(homePageTitleElement).toBeInTheDocument();
        expect(homePageSubTitleElement).toBeInTheDocument();
      });
})