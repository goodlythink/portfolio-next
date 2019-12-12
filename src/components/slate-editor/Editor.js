import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
})

export default class SlateEditor extends React.Component {
  state = {
    value: initialValue,
    isLoadded: false
  }

  componentDidMount() {
    this.setState({ isLoadded: true })
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    if (event.key !== '&') return next()
    event.preventDefault()
    editor.insertText('and')
    return true
  }

  render() {

    const { isLoadded } = this.state
    return (
      <React.Fragment>
        {
          isLoadded &&
          <Editor value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        }
      </React.Fragment>
    )
  }
}