import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/router"; // Import Next.js router

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const isConnectedRef = useRef(false); // Prevent multiple connections
  const router = useRouter(); // Get current route

  useEffect(() => {
    // Check if the URL contains "ispreview"
    const isPreviewMode = router.asPath.includes("preview");
    if (isPreviewMode && !isConnectedRef.current) {
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKETURL);

      newSocket.on("connect", () => {
        console.log("Socket connected!");
        isConnectedRef.current = true;
      });

      newSocket.on("connect_error", (err) =>
        console.error("Socket error:", err)
      );

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        isConnectedRef.current = false;
      };
    }
  }, [router.asPath]); // Re-run effect if the path changes

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
