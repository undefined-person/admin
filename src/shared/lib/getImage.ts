export const getImage = (imagePath: string) => {
  return `${import.meta.env.VITE_API_URL}${imagePath}`
}
