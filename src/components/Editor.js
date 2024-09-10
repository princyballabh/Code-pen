import React,{useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt} from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
    const{
        displayName,
        value,
        language,
        onChange
    }=props
    function handlechange(editor, data, value){
        onChange(value);
    }
    const[open, setopen]=useState(true)
  return (
    <>
      <div className={`editor-container ${open? '':'collapsed'}`}>
        <div className="editortitle">
            {displayName}
            <button type='button' className='expcolbtn' onClick={()=>setopen(prevOpen=>!prevOpen)}>
                <FontAwesomeIcon icon={open?faCompressAlt:faExpandAlt}/></button>
        </div>
        <ControlledEditor
            onBeforeChange={handlechange}
            value={value}
            className='code-mirror-wrapper'
            options={{
                lint:true,
                lineWrapping:true,
                mode:language,
                lineNumbers:true
            }}
        />
      </div>
      </>
  )
}
