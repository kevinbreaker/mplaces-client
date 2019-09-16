import axios from 'axios'
const devLink = '//localhost:3333'
const prodLink = ''

const url = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prodLink
    case 'development':
      return devLink
  }
}

const api = axios.create({
  baseURL: url(),
  headers: {
    Authorization: ''
  }
})

export const register = (data) => api.post('/register', data)
export const login = (data) => api.post('/login', data)

export const postCreateFavorite = (data) => api.post('/favorites', data)
export const getAllsFavorite = () => api.get('/favorites')
export const deleteFavorite = (id) => api.delete(`/favorites/${id}`)
export const putUpdateFavorite = (data) =>
  api.post(`/favorites/${data.id}`, data)

export const postCreateRating = (data) => api.post('/ratings', data)
export const getAllsRating = () => api.get('/ratings')
export const getRatingPlace = (id) => api.get(`/ratings/${id}`)
export const deleteRating = (id) => api.delete(`/favorites/${id}`)
export const putUpdateRating = (data) => api.post(`/favorites/${data.id}`, data)
