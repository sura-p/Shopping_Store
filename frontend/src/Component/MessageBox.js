import { Alert } from 'react-bootstrap'
import React from 'react'

function MessageBox(props) {
  return (
    <Alert variant={props.variant || 'info'}>{props.children}</Alert>
  )
}

export default MessageBox