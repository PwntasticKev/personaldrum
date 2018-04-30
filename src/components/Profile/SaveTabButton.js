import React from 'react'
import Button from 'material-ui/Button'

export default function SaveTabButton(props)  {
  return (
    <div>
      <Button onClick={console.log('this working') && props.sendPhoto}>SAVE TABB</Button>
    </div>
  )
}
