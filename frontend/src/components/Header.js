import React, { useState } from 'react';

const Header = ({ loggedIn, setLoggedIn, setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showMenu, setShowMenu] = useState(false); // Controla el estado del menú hamburguesa

    const handleLogin = async (e) => {
        e.preventDefault();

        const API_URL = process.env.NODE_ENV === 'production'
            ? 'https://eleccionesresucitado.onrender.com'
            : 'http://localhost:5001'; // La URL del backend en local

        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            const data = await res.json();
            setLoggedIn(true);
            setRole(data.role);
        } else {
            alert('Login failed');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setRole('');
        // Limpiar los campos de usuario y contraseña al hacer logout
        setUsername('');
        setPassword('');
    };

    return (
        <header className="header">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1>Actualidad de los Hechos de las Elecciones del Resucitado 2024</h1>

            {!loggedIn ? (
                <>
                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Login</button>
                    </form>

                    {/* Menú hamburguesa solo visible en pantallas pequeñas */}
                    <div className="hamburger-menu">
                        <button className="hamburger-icon" onClick={() => setShowMenu(!showMenu)}>
                            ☰
                        </button>
                        {showMenu && (
                            <div className="menu-content">
                                <form onSubmit={handleLogin} className="login-form">
                                    <input
                                        type="text"
                                        placeholder="Usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button type="submit">Login</button>
                                </form>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </header>
    );
};

export default Header;
