import React, { Component } from "react"

export default class WordHist extends Component {
  render() {
    return (
      <div className="class-name">
        {this.props.wordData.map(item => {
          return (
            <div>
              <span>{item[0]}</span>
              <span
                style={{
                  width: `${item[1] * 5}px`,
                }}
              >
                {item[1]}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}
