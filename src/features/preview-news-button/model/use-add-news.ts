import { useNavigate } from 'react-router-dom'

import { Routes } from '@/shared/types/routes.types'

export const useAddNews = () => {
  const navigate = useNavigate()

  const onAdd = () => {
    navigate(Routes.ADD_NEWS)
  }

  return {
    onAdd,
  }
}
