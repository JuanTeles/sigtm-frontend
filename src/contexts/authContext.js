// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginRequest, logoutRequest } from '../api/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoverUser = () => {
            // Não recuperamos token, pois é via Cookie (Sessão)
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        recoverUser();
    }, []);

    const signIn = async (login, senha) => {
        try {
            const data = await loginRequest(login, senha);
            
            // O Backend retorna o objeto SessaoResponseDTO diretamente:
            // { id, email, nome, tipoUsuario, logado: true }
            
            // Não existe 'token' na resposta do seu backend atual.
            // Salvamos apenas os dados do usuário para uso visual.
            localStorage.setItem('user', JSON.stringify(data));
            
            setUser(data);
            return { success: true };
        } catch (error) {
            console.error("Erro no login", error);
            localStorage.removeItem('user'); // Garante que não haverá usuário fantasma
            const msg = error.response?.data?.message || "Erro ao realizar login";
            return { success: false, message: msg };
        }
    };

    const signOut = async () => {
        await logoutRequest();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};