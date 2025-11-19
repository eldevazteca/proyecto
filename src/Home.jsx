import * as React from 'react'
import './App.css'

//? Material UI impotations
import HomeCard from './components/HomeCard';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center max-h-screen">
            {/*
                //? En este caso, el componente HomeCard es un componente que contiene los botones de la interfaz de Material UI, pero al haber muchas importaciones el archivo Home se haria muy extenso. Por eso mismo existen los componentes, para hacer menos pesadas las vistas, pero principalmente para reutilizar codigo y evitar duplicidad del mismo.
                */}

            <HomeCard />

            <div className='flex flex-col md:flex-row gap-4 items-center justify-center mt-0'>
                <Link to="/log/sign-in">
                    <button
                        type="submit"
                        className="flex w-80 items-center justify-center rounded-md !bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:!outline-blue-500"
                    >
                        Iniciar Sesión
                    </button>
                </Link>
                <Link to="/log/sign-up">
                    <button
                        type="submit"
                        className="flex w-80 justify-center rounded-md !bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:!outline-blue-500"
                    >
                        Registrarme
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home;