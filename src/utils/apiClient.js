const baseURL = new URL("https://jsonplaceholder.typicode.com")

const getData = () => {
  return fetch(baseURL)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
}

const getUsers = () => {
  baseURL.pathname = "/users"
  return getData()
}

const getPostsByUser = userId => {
  baseURL.pathname = "/posts"
  baseURL.search = new URLSearchParams({
    userId: userId,
  })
  return getData()
}

const getCommentsForPost = postId => {
  baseURL.pathname = "/comments"
  baseURL.search = new URLSearchParams({
    postId: postId,
  })
  return getData()
}

export default {
  getUsers: getUsers,
  getPostsByUser: getPostsByUser,
  getCommentsForPost: getCommentsForPost,
}
