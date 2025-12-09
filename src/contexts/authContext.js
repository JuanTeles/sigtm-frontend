// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginRequest } from '../api/authService';
import api from '../api/axiosConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Ao iniciar a app, verifica se já existe token salvo
    useEffect(() => {
        const recoverUser = () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                setUser(JSON.parse(storedUser));
                // Define o token padrão para o axios, caso a app seja recarregada
                api.defaults.headers.Authorization = `Bearer ${storedToken}`;
            }
            setLoading(false);
        };

        recoverUser();
    }, []);

    const signIn = async (login, senha) => {
        try {
            const data = await loginRequest(login, senha);
            
            // O Backend retorna SessaoResponseDTO: { token: "...", usuario: {...} }
            const { token, usuarioResumoDto } = data; // Ajuste o nome 'usuarioResumoDto' conforme o JSON exato do backend

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(usuarioResumoDto));
            
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(usuarioResumoDto);
            return { success: true };
        } catch (error) {
            console.error("Erro no login", error);
            return { success: false, message: error.response?.data?.message || "Erro ao realizar login" };
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        api.defaults.headers.Authorization = undefined;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o contexto mais facilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};