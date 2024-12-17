import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      {/* Using an image from the public folder */}
      <img src="/logo.png" alt="Feastly Logo" style={{ height: "100px", width: "auto" }} />
    </div>
  );
};

export default Logo;
