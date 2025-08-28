import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import {MenuProvider} from './context/MenuContext'
import Navbar from './components/Navbar'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Blog = lazy(() => import('./pages/Blog'))

function App() {
    return (
        <Router>
            <MenuProvider>
                <div className="min-h-screen overflow-x-hidden">
                    <Navbar/>
                    <Suspense
                        fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
                        <main>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/contact" element={<Contact/>}/>
                                <Route path="/blog" element={<Blog/>}/>
                            </Routes>
                        </main>
                    </Suspense>
                </div>
            </MenuProvider>
        </Router>
    )
}

export default App
