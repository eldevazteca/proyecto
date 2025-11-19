import React from 'react'

const HomeCard = () => {
    return (
        <div className='justify-center px-6 py-0 lg:px-6'>
            <div className="py-6 px-12">
                <div className="text-center">
                    <img
                        alt="CETis 161"
                        src="/images/imgHome.jpg"
                        className="mx-auto h-auto w-auto rounded-2xl"
                    />
                    <h2 className="mt-10 text-2xl font-bold tracking-tight text-white">
                        ¡Aprende de nuevo!
                    </h2>
                    <p className="mt-6 text-lg font-medium text-gray-200 sm:text-xl/8">
                        Estamos especializados en darte una calurosa bienvenida para que logres una de tus metas, ¡Terminar tu educación básica!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomeCard