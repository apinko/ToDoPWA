import React, { useState, useEffect } from "react";

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div className={`fixed top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm rounded-md text-white mb-4 ${
      isOnline ? "bg-green-500" : "bg-red-500"
    }`}>
      {isOnline ? "You are online" : "You are offline"}
    </div>
  );
};

export default ConnectionStatus;