import React, { Component } from "react"

import api from "../utils/apiClient"
import WordTable from "./wordtable"
import WordHist from "./wordhist"
import "./wordstats.css"

export default class WordStats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isProcessing: false,
      wordDataSet: {},
    }
  }

  buildWordDataSet = userId => {
    var self = this
    var wordDataSet = {}
    this.setState({ isProcessing: true }, () =>
      api.getPostsByUser(userId).then(json => {
        json.map(item =>
          api.getCommentsForPost(item.id).then(json => {
            json.forEach(item =>
              item.body.split(" ").forEach(function(item) {
                const word = item.trim()
                if (Object.keys(wordDataSet).includes(word)) {
                  wordDataSet[word] += 1
                } else {
                  wordDataSet[word] = 1
                }
                self.setState({ wordDataSet: wordDataSet })
              })
            )
          })
        )
        this.setState({ isProcessing: false })
      })
    )
  }

  sortWordData() {
    return Object.entries(this.state.wordDataSet).sort((a, b) => {
      if (a[1] < b[1]) {
        return -1
      }
      if (a[1] > b[1]) {
        return 1
      }
      return 0
    })
  }

  componentDidMount() {
    this.buildWordDataSet(this.props.user.id)
  }

  render() {
    const wordList = this.sortWordData()
    return (
      <div className="word-container">
        <WordTable wordData={wordList} />
        <WordHist wordData={wordList.slice(0, 10)} />
      </div>
    )
  }
}
