export default function({ store, error }) {
  if (!store.state.user.token) {
    error({
      message: 'Você não tem permissão, por favor faça login',
      statusCode: 401
    })
  }
}
