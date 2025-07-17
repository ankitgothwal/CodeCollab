import React, { useEffect, useState } from "react";

const Wrapper = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    // Listen for screen resize
    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div className="p-8 w-screen h-dvh bg-red-50 gap-10 flex-col flex items-center justify-around">
        <div className="text-3xl text-center text-balance text-red-500 font-bold">
          {"<CoDevTogether/>"}
        </div>
        <div className="text-3xl text-center text-balance text-red-500 font-bold">
          Please use a larger screen to use this app
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Wrapper;
