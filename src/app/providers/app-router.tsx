import { useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from './route.config'
import { AppRoutesProps } from '@/shared/types/routes.types'
import { MainLayout } from '@/shared/layouts/main-layout'

export const AppRouter = () => {
  const renderRoute = useCallback((route: AppRoutesProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.withLayout ? <MainLayout>{route.element}</MainLayout> : route.element}
      />
    )
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>
}
