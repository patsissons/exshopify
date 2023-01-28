/* eslint-disable no-process-env */

// general env
export const NODE_ENV = process.env.NODE_ENV

// auth env
export const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

// supabase env
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
export const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// env transformations
export const isDevelopment = Boolean(NODE_ENV === 'development')
export const isProduction = Boolean(NODE_ENV === 'production')
