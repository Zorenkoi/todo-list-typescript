import { useState, useEffect } from "react";

const Header: React.FC = () => {
  return (
    <div className="p-3 bg-gray-100 font-bold text-lg text-gray-700">
      Todos({4})
    </div>
  );
};

export default Header;
