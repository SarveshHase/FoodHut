import './App.css'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'
import { Outlet } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';  // Adjust the import path as necessary
import { useLoaderContext } from '../context/Loadercontext'
import SearchResults from './components/SearchResults'

function App() {
  const { progress, setProgress } = useLoaderContext();  // Access progress and setProgress from context

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
      />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
