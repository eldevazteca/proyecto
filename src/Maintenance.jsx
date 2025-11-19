import React from 'react'
import { Link } from 'react-router'

const Maintenance = () => {
    return (
        <div className='flex min-h-full flex-1 justify-center px-6 py-12 lg:px-6'>
            <div className="border-2 border-blue-500 rounded-2xl py-10 px-12">
                <div className="text-center">
                    <img
                        alt="CETis 161"
                        src="/images/logo.jpg"
                        className="mx-auto h-24 w-auto rounded-2xl"
                    />
                    <p className="mt-10 text-4xl font-semibold text-white">
                        Página en mantenimiento
                    </p>
                    <p className="mt-6 text-lg font-medium text-gray-200 sm:text-xl/8">
                        Lamentamos las molestias, estamos trabajando para mejorar.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to={'/'}
                            className="rounded-md !bg-blue-500 px-3.5 py-2.5 text-sm font-semibold !text-white shadow-xs hover:!bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:!outline-blue-500"
                        >
                            Ir a Inicio
                        </Link>
                        <a href="#" className="text-sm font-semibold !text-blue-400 hover:!text-blue-500">
                            Contact support <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Maintenance