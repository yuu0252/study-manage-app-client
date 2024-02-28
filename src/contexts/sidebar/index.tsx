import { createContext, useState } from 'react';

const SidebarContext = createContext({
  isOpen: false,
  toggleOpen: () => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
