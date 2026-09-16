import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const pathname = window.location.pathname

  if (pathname === '/register') {
    return <RegisterPage />
  }

  return <LoginPage />
}

export default App
