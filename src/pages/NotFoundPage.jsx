import { Link } from 'react-router-dom'
import notFoundImage from '../assets/404-error.png'

function NotFoundPage() {
	return (
		<main className="min-h-screen bg-slate-50 lg:flex">
			

			<section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10">
				<div className="w-full max-w-md text-center">
					<div className="mb-10 flex justify-center lg:hidden">
						<div className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950">
							<span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-bold">
								B
							</span>
							Brightline
						</div>
					</div>

					<img
						className="mx-auto mb-8 w-full max-w-xs"
						src={notFoundImage}
						alt="404 error"
					/>

					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
						Page not found
					</p>
					<h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
						We lost that page
					</h2>
					<p className="mt-3 text-base leading-7 text-slate-500">
						The page you are looking for does not exist or may have moved.
					</p>

					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Link
							className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
							to="/login"
						>
							Back to sign in
						</Link>
						<Link
							className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:text-cyan-900"
							to="/register"
						>
							Create an account
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}

export default NotFoundPage
