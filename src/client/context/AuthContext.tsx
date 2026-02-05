import { createContext, useCallback, useContext, useMemo } from "react";

interface AuthContextType {
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const signOut = useCallback(async () => {
  }, []);

  const signUp = useCallback(async () => {
  }, []);

  const signIn = useCallback(async () => {
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      signUp,
      signIn,
      signOut,
    }),
    [signUp, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
