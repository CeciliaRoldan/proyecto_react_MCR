import { createContext, useState, useContext } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => 
{
    const [user, setUser] = useState(null);
    
    const login = (username) => {
        const token = `fake-token-${username}`;
        localStorage.setItem('authToken', token);
        setUser(username);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = () => useContext(AuthContext);
