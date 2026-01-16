import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
  </BrowserRouter>,
)
