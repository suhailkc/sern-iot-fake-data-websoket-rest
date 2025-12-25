import DashboardPage from './pages/Dashboard'
import DashboardSimple from './pages/DashboardSimple'

const App = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Sensor Dashboard</h1>
      <DashboardSimple />
      <hr className="my-5" />
      <DashboardPage />
    </div>
  )
}

export default App