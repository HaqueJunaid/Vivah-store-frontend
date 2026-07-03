import { Link } from 'react-router-dom'
import { FaArrowLeft, FaSadTear } from 'react-icons/fa'

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col bg-linear-to-br from-stone-50 via-white to-stone-100 text-stone-900 py-4 gap-5">
            <Link className='lg:absolute lg:left-1/2 lg:top-6 lg:-translate-x-1/2' to="/">
                <img className='size-20 lg:size-30' src="/Assets/Logo.svg" alt="Logo" />
            </Link>
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl rounded-[40px] border border-stone-200 bg-white/90 p-10 shadow-xl shadow-stone-200/60 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-sm">
                            <FaSadTear className="size-10" />
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Page not found</p>
                            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-stone-900 sm:text-6xl">404</h1>
                            <p className="mt-4 text-base leading-8 text-stone-600 sm:text-lg">
                                The page you were looking for doesn’t exist or has been moved. Explore our store, go back to the homepage, or start a new search.
                            </p>
                        </div>

                        <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-900/10 transition hover:-translate-y-0.5 hover:bg-stone-800"
                            >
                                <FaArrowLeft className="mr-2 size-4" />
                                Back to homepage
                            </Link>
                            <Link
                                to="/products/assets"
                                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-900 hover:bg-stone-50"
                            >
                                Browse products
                            </Link>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl bg-stone-50 p-5 text-left">
                                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Need help?</p>
                                <p className="mt-3 text-sm font-semibold text-stone-900">Contact support</p>
                            </div>
                            <div className="rounded-3xl bg-stone-50 p-5 text-left">
                                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Saved items</p>
                                <p className="mt-3 text-sm font-semibold text-stone-900">Check wishlist</p>
                            </div>
                            <div className="rounded-3xl bg-stone-50 p-5 text-left">
                                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Cart</p>
                                <p className="mt-3 text-sm font-semibold text-stone-900">View your bag</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
