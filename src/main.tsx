import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import Router from './router'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router></Router>
      <ReactQueryDevtools/> {/* Sirve pra tener la playita y verificar el estado de las consultas */}
    </QueryClientProvider>

  </StrictMode>,
)
