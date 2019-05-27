import React, { Component } from "react"
import Autosuggest from "react-autosuggest"

import api from "../utils/apiClient"
import "./topbar.css"

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => <span>{suggestion.name}</span>

export default class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      selectedUser: "",
      suggestions: [],
    }
  }
  componentDidMount() {
    api.getUsers().then(json => {
      this.setState({ userList: json })
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      selectedUser: newValue,
    })
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : this.state.userList.filter(user =>
          user.name.toLowerCase().includes(inputValue)
        )
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render() {
    const inputProps = {
      placeholder: "Select a user",
      value: this.state.selectedUser,
      onChange: this.onChange,
    }
    return (
      <div className="top-bar">
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <button
          type="button"
          className="btn__select"
          onClick={() => {
            this.props.handleUserSelected(
              this.state.userList.find(
                user =>
                  user.name.toLowerCase() ===
                  this.state.selectedUser.toLowerCase()
              )
            )
          }}
        >
          Select
        </button>
      </div>
    )
  }
}
