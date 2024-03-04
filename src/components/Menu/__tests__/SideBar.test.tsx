import { render, screen } from '@testing-library/react';
import { PROCESS_RESOURCES } from '../../../commons/constants';
import SideBar from '../SideBar';
import menuOption from '../../../hook/menuOption';

describe("SideBar", () => {

    test("Render Process SideBar", () => {
        const { getMenuOptions } = menuOption();
        
        render(<SideBar 
            name={PROCESS_RESOURCES} />);
    
        getMenuOptions(PROCESS_RESOURCES).map((item: any, i: React.Key | null | undefined) => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        })
      });

});