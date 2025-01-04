import React from "react";

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-[#E0E2E0]">{title}</h1>
    </div>
  );
};

export default Heading;
