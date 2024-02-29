import React from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

export default function ArrowReturn(props) {
    if (props.field === props.sortedLabel) {
        if (props.asc) {
            return (
                <AiFillCaretDown />
            )
        } else {
            return (
                <AiFillCaretUp />
            )
        }
    }
}
