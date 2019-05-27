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
            {console.log(this.totalWordCount)}
            {this.props.wordData.slice(0, 10).map(item => (
              <tr key={item[0]}>
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
