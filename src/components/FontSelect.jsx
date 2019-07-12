import React from 'react'
import useDownloadOnClick from '../hooks/useDownloadOnClick'

const FontSelect=({font, onChange})=>{
  const fontFamily = font.family
  const [isDownloaded, onFontClick] = useDownloadOnClick(font)
  return (
    <div className='font-select' style={{ fontFamily: fontFamily}}>
      <p>
        <input type="checkbox" name="vehicle1" value="Bike" onClick={onChange}/>
        <span style={{color: isDownloaded ? 'silver': 'black' }} onClick={onFontClick}>
          {fontFamily}
        </span>
      </p>
    </div>
  )
}

export default FontSelect

