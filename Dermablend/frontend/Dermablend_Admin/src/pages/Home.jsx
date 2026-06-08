// Home.jsx muestra la pantalla principal del usuario una vez que ya está autenticado.
// También se asegura de que la página no esté disponible si no existe token.
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Nav from '../components/Nav' // Componente de navegación que se muestra cuando el usuario está logueado.

const Home = () => {
  const navigate = useNavigate() // Hook de react-router para redirigir programáticamente.
  const token = localStorage.getItem('fakestore_token') || sessionStorage.getItem('fakestore_token')
  // El usuario puede haber elegido guardar la sesión en localStorage o sessionStorage.
  const user = localStorage.getItem('fakestore_user') || sessionStorage.getItem('fakestore_user') || ''

  useEffect(() => {
    // Si no hay token, redirige al login.
    if (!token) {
      navigate('/')
    }
  }, [navigate, token])

  const Orders = () => {
    const apiURL = "mongodb+srv://Devteam:Devteam@cluster0.ccct41l.mongodb.net/PenjaminCluster/Dermablend";
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {
      try {
        const response = await fetch({apiURL});
        const data = await response.json();
        setOrders(Array.isArray(data.items) ? data : []) // Asegura que orders siempre sea un array.
    }catch (error) {
      console.error('Error fetching orders:', error)
    }finally{
      setLoading(false)
    }
  }

  const handleLogout = () => {
    // Borra todos los datos de sesión del almacenamiento local y de sesión.
    localStorage.removeItem('fakestore_token')
    localStorage.removeItem('fakestore_user')
    localStorage.removeItem('fakestore_email')
    sessionStorage.removeItem('fakestore_token')
    sessionStorage.removeItem('fakestore_user')
    sessionStorage.removeItem('fakestore_email')
    navigate('/') // Redirige al login después de cerrar sesión.
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {token && <Nav />} {/* Muestra la navegación solo si hay token. */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Bienvenido {user ? `, ${user}` : ''}
          </h1>
        </header>
        <main className="mt-8">
          <button onClick={handleLogout} className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Cerrar Sesión
          </button>
        </main>
      </div>
    </div>
  )
}

export default Home
