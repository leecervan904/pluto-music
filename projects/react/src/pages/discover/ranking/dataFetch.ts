import axios from 'axios'

export async function fetchUser() {
  return axios
    .get('https://jsonplaceholder.typicode.com/users/3')
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

const dataFetch = () => {
  const userPromise = fetchUser
  return {
    user: wrapPromise(userPromise),
  }
}

const wrapPromise = (promise) => {
  let status = 'pending'
  let result
  const suspend = promise().then(
    (res) => {
      status = 'success'
      result = res
    },
    (err) => {
      status = 'error'
      result = err
    },
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspend
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    },
  }
}

export default dataFetch
