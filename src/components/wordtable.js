import React, { Component } from "react"

export default class WordTable extends Component {
  componentDidMount() {
    this.totalWordCount = this.props.wordData.reduce(
      (acc, currentValue) => acc + currentValue[1],
      0
    )
  }
  render() {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>% of all comments</th>
            </tr>
          </thead>
          <tbody>
            {this.props.wordData.map(item => (
              <tr>
                <td>{item[0]}</td>
                <td>{item[1] / this.totalWordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
