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
    <div className={`px-4 py-2 rounded-md text-white ${
      isOnline ? "bg-green-500" : "bg-red-500"
    }`}>
      {isOnline ? "You are online" : "You are offline"}
    </div>
  );
};

export default ConnectionStatus;
