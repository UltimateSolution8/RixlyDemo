/**
 * Sanity Studio Entry Point
 * 
 * This file renders the Sanity Studio React application
 */

import {createRoot} from 'react-dom/client'
import {Studio} from './Studio'
import './index.css'

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(<Studio />)
}
