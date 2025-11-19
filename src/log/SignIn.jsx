import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

const SignIn = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        console.log('Intentando iniciar sesión con:', { username, password }); // Log de los datos a enviar

        try {
            const response = await fetch('http://localhost:5000/log/sign-in/client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, passwd: password }), // Asegurar que el campo sea 'passwd' para el backend
            });
            
            const data = await response.json();
            console.log('Respuesta completa del servidor:', { responseStatus: response.status, responseOk: response.ok, data }); // Log de la respuesta completa

            if (response.ok) {
                Swal.fire({
                    title: "Inicio de sesión exitoso",
                    icon: "success",
                    draggable: true,
                    timer: 1500
                });
                navigate('/client/home');
            } else {
                setError(data.error || 'Error al iniciar sesión'); // Mostrar el error específico del servidor
            }
        } catch (err) {
            console.error('Error de red o inesperado:', err);
            setError('Error al iniciar sesión. Por favor, intente de nuevo.');
        }
    }

    return (
        <div className='flex min-h-full flex-1 justify-center px-6 py-12 lg:px-6'>
            <div className="border-2 border-blue-500 rounded-2xl py-10 px-12">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="CETis 161"
                        src="/images/logo.jpg"
                        className="mx-auto h-24 w-auto rounded-2xl"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Ingrese a su cuenta
                    </h2>
                </div>
                {/* Formulario de inicio de sesión */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-4" onSubmit={ handleSubmit }>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                                    Usuario
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                id="username"
                                name="username"
                                value={ username }
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="usuario@gmail.com"
                                required
                                autoComplete="username"
                                className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                    Contraseña
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                id="password"
                                name="password"
                                value={ password }
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="********"
                                required
                                autoComplete="current-password"
                                className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                                <div className="text-sm m-5">
                                    <Link to={'/maintenance'} className="font-semibold !text-blue-400 hover:!text-blue-500">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="!text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md !bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        ¿No tienes una cuenta?{' '}
                        <Link to={'/log/sign-up'} className="font-semibold !text-blue-400 hover:!text-blue-500">
                            Registrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn