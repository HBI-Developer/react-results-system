import React, { Fragment } from 'react'

export default function NumberInput(props) {
    const sanitizeInput = ev => {
        let allow = ["NumLock", "Home", "End", "Shift", "Control", "Shift", "Backspace", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Alt", "Tab"];
        if (isNaN(+ev.key) && allow.indexOf(ev.key) === -1) {
            ev.preventDefault();
        }
    }

    const blur = ev => {
      if (props.bluring) {
        props.bluring(ev);
      }
    }

  return (
    <Fragment>
        <input type="number" className={props.className} defaultValue={props.default ?? ''} max={props.max ?? ''} min={props.min ?? ''} onKeyDown={sanitizeInput} onBlur={blur} />
    </Fragment>
  )
}
