'use client';

interface ContainerProps {
  children: React.ReactNode
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return ( 
    <div
      className="
        container px-2 py-20 mx-auto xl:px-6
      "
    >
      {children}
    </div>
   );
}
 
export default Container;
