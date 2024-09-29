import React, { createContext, useContext, ReactNode } from 'react';
import useAuth from '../../hooks/useAuth';

interface AuthContextType {
	loading: boolean;
	authenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { loading, authenticated } = useAuth();

	return (
		<AuthContext.Provider value={{ loading, authenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useUserAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useUserAuth must be used within a UserAuthProvider');
	}
	return context;
};
