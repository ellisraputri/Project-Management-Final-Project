import React from "react";

function BackgroundLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
        {/* left*/}
        <div className="absolute top-10 left-[-40px] w-60 h-60 bg-[#CBDCEB]/30 rounded-full " />
        <div className="absolute top-40 left-[-60px] w-60 h-60 bg-[#CBDCEB]/30 rounded-full " />
        <div className="absolute bottom-55 left-8 w-7 h-7 bg-[#CBDCEB]/40 rounded-full" />
        <div className="absolute bottom-35 left-20 w-8 h-8 bg-[#CBDCEB]/40" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        <div className="absolute bottom-18 left-8 w-5 h-5 bg-[#CBDCEB]/40" />

        {/* right*/}
        <div className="absolute top-10 right-[-40px] w-60 h-60 bg-[#CBDCEB]/30 rounded-full " />
        <div className="absolute top-40 right-[-60px] w-60 h-60 bg-[#CBDCEB]/30 rounded-full " />
        <div className="absolute bottom-55 right-8 w-7 h-7 bg-[#CBDCEB]/40 rounded-full" />
        <div className="absolute bottom-35 right-20 w-8 h-8 bg-[#CBDCEB]/40" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        <div className="absolute bottom-18 right-8 w-5 h-5 bg-[#CBDCEB]/40" />

        {/* Main content */}
        <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BackgroundLayout;
