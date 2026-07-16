"use client";
import { createContext, useContext, useState, useCallback } from "react";

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

  const setUserName = useCallback((name: string) => {
    const trimmed = name.trim() || DEFAULT_NAME;
    setUserNameState(trimmed);
    setHasSetName(true);
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
