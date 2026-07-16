"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "novadrive-user-name";
const DEFAULT_NAME = "Friend";

interface UserNameContextValue {
  userName: string;
  setUserName: (name: string) => void;
  hasSetName: boolean;
}

const UserNameContext = createContext<UserNameContextValue>({
  userName: DEFAULT_NAME,
  setUserName: () => {},
  hasSetName: false,
});

export function UserNameProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserNameState] = useState<string>(DEFAULT_NAME);
  const [hasSetName, setHasSetName] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUserNameState(stored);
        setHasSetName(true);
      }
    } catch {}
  }, []);

  const setUserName = useCallback((name: string) => {
    const trimmed = name.trim() || DEFAULT_NAME;
    setUserNameState(trimmed);
    setHasSetName(true);
    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {}
  }, []);

  return (
    <UserNameContext.Provider value={{ userName, setUserName, hasSetName }}>
      {children}
    </UserNameContext.Provider>
  );
}

export function useUserName() {
  return useContext(UserNameContext);
}
