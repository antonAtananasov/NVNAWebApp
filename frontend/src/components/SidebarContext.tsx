import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SidebarContextProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps>({
    show: false,
    setShow: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [show, setShow] = useState(false);

    return (
        <SidebarContext.Provider value={{ show, setShow }}>
            {children}
        </SidebarContext.Provider>
    );
};
