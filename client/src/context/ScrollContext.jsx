import { createContext, useState, useEffect, useContext } from 'react';

export const ScrollContext = createContext(false);

export const ScrollProvider = ({ children }) =>{
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{scrolled, setScrolled}}>
      {children}
    </ScrollContext.Provider>
  );
}