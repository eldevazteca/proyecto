import React, { useState } from 'react'
import { Link } from 'react-router'
import '../App.css'
import Swal from 'sweetalert2'

const SignUp = () => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastSecondName, setLastSecondName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfB, setDateOfB] = useState('');
    const [explanation, setExplanation] = useState('');
    const [lastGrade, setLastGrade] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/log/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    lastSecondName,
                    phone,
                    address,
                    username,
                    passwd: password,
                    dateOfB,
                    explanation,
                    lastGrade
                }),
            });

            const data = await response.json();
            
            if (response.ok) {
                // Registro exitoso
                Swal.fire({
                    title: "Usuario registrado exitosamente",
                    icon: "success",
                    draggable: true,
                    timer: 1500
                });
                window.location.href = '/log/sign-in';
            } else {
                // Mostrar error
                Swal.fire({
                    title: data.error || "Error al registrar usuario",
                    icon: "error",
                    draggable: true,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar usuario. Por favor, intente de nuevo.');
        }
    }
    return (
        <div className='flex-1'>
            <div className="flex min-h-full flex-col md:flex-row justify-center px-6 py-12 lg:px-8 border-2 border-blue-500 rounded-2xl">
                <div className="sm:mx-auto sm:w-full md:w-1/2 md:pr-8 flex flex-col justify-center">
                    <img
                        alt="CETis 161"
                        src="/images/logo.jpg"
                        className="mx-auto h-24 w-auto rounded-2xl items-center justify-center"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Crea tu cuenta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full md:w-1/2 md:mt-0">
                    <form action="#" method="POST" className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre */}
                            <div>
                                <label htmlFor="nombre" className="block text-sm/6 font-medium text-white">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Pedro"
                                    required
                                    autoComplete="name"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            {/* Apellido Paterno */}
                            <div>
                                <label htmlFor="apellidoPaterno" className="block text-sm/6 font-medium text-white">
                                    Apellido Paterno
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    placeholder="Perez"
                                    required
                                    autoComplete="lastName"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            {/* Apellido Materno */}
                            <div>
                                <label htmlFor="apellidoMaterno" className="block text-sm/6 font-medium text-white">
                                    Apellido Materno
                                </label>
                                <input
                                    id="lastSecondName"
                                    name="lastSecondName"
                                    value={lastSecondName}
                                    onChange={(e) => setLastSecondName(e.target.value)}
                                    type="text"
                                    placeholder="Gomez"
                                    required
                                    autoComplete="lastSecondName"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label htmlFor="phone" className="block text-sm/6 font-medium text-white">
                                    Teléfono
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="number"
                                    placeholder="3323181683"
                                    required
                                    autoComplete="phone"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm/6 font-medium text-white">
                                    Nombre de usuario
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    placeholder="Nogalera #30, Tala"
                                    required
                                    autoComplete="username"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            <div>
                                {/* md:col-span-2 */}
                                <label htmlFor="address" className="block text-sm/6 font-medium text-white">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Nogalera #30, Tala"
                                    required
                                    autoComplete="password"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            <div>
                                {/* md:col-span-2 */}
                                <label htmlFor="address" className="block text-sm/6 font-medium text-white">
                                    Fecha de nacimiento
                                </label>
                                <input
                                    id="dateOfB"
                                    name="dateOfB"
                                    value={dateOfB}
                                    onChange={(e) => setDateOfB(e.target.value)}
                                    type="date"
                                    placeholder="2000-01-01"
                                    required
                                    autoComplete="dateOfB"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm/6 font-medium text-white">
                                    Ultimo grado cursado
                                </label>
                                <input
                                    id="lastGrade"
                                    name="lastGrade"
                                    value={lastGrade}
                                    onChange={(e) => setLastGrade(e.target.value)}
                                    type="number"
                                    placeholder="Nogalera #30, Tala"
                                    required
                                    autoComplete="lastGrade"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            {/* Dirección - Full width */}
                            <div className='md:col-span-2'>
                                <label htmlFor="address" className="block text-sm/6 font-medium text-white">
                                    Dirección
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    placeholder="Nogalera #30, Tala"
                                    required
                                    autoComplete="address"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>

                            <div className='md:col-span-2'>
                                <label htmlFor="address" className="block text-sm/6 font-medium text-white">
                                    Explicacion
                                </label>
                                <input
                                    id="explanation"
                                    name="explanation"
                                    value={explanation}
                                    onChange={(e) => setExplanation(e.target.value)}
                                    type="text"
                                    placeholder="Nogalera #30, Tala"
                                    required
                                    autoComplete="password"
                                    className="mt-1 block w-full rounded-md !bg-white px-3 py-1.5 text-base !text-gray-900 outline-1 -outline-offset-1 !outline-gray-300 !placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:!outline-blue-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md !bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:!outline-blue-500"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to={'/log/sign-in'} className="font-semibold !text-blue-400 hover:!text-blue-500">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>   
    )
}

export default SignUp