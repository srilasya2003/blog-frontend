import BrandPanel from '../components/BrandPanel'
import LoginForm from '../components/LoginForm'

function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 lg:flex">
      <BrandPanel />

      <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 font-bold">
                B
              </span>
              Brightline
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Welcome back
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Sign in to your account
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-500">
            Pick up where you left off and keep discovering ideas worth sharing.
          </p>

          <LoginForm />

          <p className="mt-8 text-center text-sm text-slate-500">
            New to Brightline?{' '}
            <a
              className="font-semibold text-cyan-700 hover:text-cyan-900"
              href="/register"
            >
              Create an account
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
