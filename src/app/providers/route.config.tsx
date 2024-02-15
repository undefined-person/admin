import {
  AppRoutesProps,
  Routes,
  getAddNewsRoute,
  getAddUserRoute,
  getHomeRoute,
  getSignInRoute,
} from '@/shared/types/routes.types'
import { SignIn, ProtectedRoute } from '@/features/auth'
import { NewsListPage } from '@/pages/news-list-page'
import { AddNewsPage } from '@/pages/add-news-page'
import { PreviewNewsPage } from '@/pages/preview-news-page'
import { EditNewsPage } from '@/pages/edit-news-page'
import { AddUserPage } from '@/pages/add-user-page'

export const routeConfig: Record<Routes, AppRoutesProps> = {
  [Routes.HOME]: {
    path: getHomeRoute(),
    element: (
      <ProtectedRoute>
        <NewsListPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  [Routes.SIGN_IN]: {
    path: getSignInRoute(),
    element: <SignIn />,
  },
  [Routes.ADD_NEWS]: {
    path: getAddNewsRoute(),
    element: (
      <ProtectedRoute>
        <AddNewsPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  [Routes.PREVIEW_NEWS]: {
    path: '/preview/:id',
    element: (
      <ProtectedRoute>
        <PreviewNewsPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  [Routes.EDIT_NEWS]: {
    path: '/edit/:id',
    element: (
      <ProtectedRoute>
        <EditNewsPage />,
      </ProtectedRoute>
    ),
    withLayout: true,
  },
  [Routes.ADD_USER]: {
    path: getAddUserRoute(),
    element: (
      <ProtectedRoute isAdminRoute>
        <AddUserPage />
      </ProtectedRoute>
    ),
    withLayout: true,
  },
}
