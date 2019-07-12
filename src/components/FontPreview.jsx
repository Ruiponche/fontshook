import React, { useContext } from 'react'
import {AppConfigContext} from "../App"
import useDownloadOnClick from '../hooks/useDownloadOnClick'

const FontPreview=({font, sampleText})=>{
  const config = useContext(AppConfigContext)
  const [isDownloaded, onFontClick] = useDownloadOnClick(font)
  const fontFamily = font.family
  const linesSampleText = sampleText.split("\n")
  return (
    <div 
      className='font-preview' style={{color: config.color,
        backgroundColor: config.backgroundColor,}}>

      <p style={{color: isDownloaded ? 'silver': 'black' }} onClick={onFontClick}>{fontFamily}</p>

      {linesSampleText.map(line=>{
        return(<p style={{ 
          fontFamily: fontFamily,
          fontStyle: config.italic ? 'italic' : 'normal',
          fontWeight: config.weight,
          fontSize: config.size
        }}>{line}</p>)
      })}
    </div>
  )
}

export default FontPreview

