import React, { Fragment } from "react"

import SEO from "../components/seo"
import TopBar from "../components/topbar"
import PostList from "../components/postlist"
import WordStats from "../components/wordstats"

import "./index.css"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isUserSelected: false,
      selectedUser: {},
    }
    this.handleUserSelected = this.handleUserSelected.bind(this)
  }

  handleUserSelected(selectedUser) {
    if (selectedUser !== undefined) {
      this.setState({ isUserSelected: true, selectedUser: selectedUser })
    } else {
      this.setState({ isUserSelected: false })
    }
  }

  render() {
    return (
      <Fragment>
        <SEO title="Home" />
        <TopBar handleUserSelected={this.handleUserSelected} />
        {this.state.isUserSelected && (
          <div className="container">
            <PostList user={this.state.selectedUser} />
            <WordStats user={this.state.selectedUser} />
          </div>
        )}
      </Fragment>
    )
  }
}

export default IndexPage
