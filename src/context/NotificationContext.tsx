import React, { createContext, useContext, useState } from 'react';

interface NotificationProviderProps {
    children: React.ReactNode;
}

interface NotificationContextType {
    notification: { show: boolean; message: string };
    showNotification: (message: string) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState({ show: false, message: '' });

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '' });
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};