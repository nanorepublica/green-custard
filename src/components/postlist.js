import React, { Component } from "react"

import api from "../utils/apiClient"
import "./postlist.css"

export default class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: [],
    }
  }
  componentDidMount() {
    console.log(this.props)
    api.getPostsByUser(this.props.user.id).then(json => {
      console.log(json)
      this.setState({ postList: json })
    })
  }
  render() {
    return (
      <ul className="list">
        {this.state.postList.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    )
  }
}
