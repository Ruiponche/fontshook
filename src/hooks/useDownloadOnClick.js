import { useState } from 'react'

function useDownloadOnClick(font) {
  const [isDownloaded, setDownloaded] = useState(false)

  const onFontClick= () => {
    var win = window.open(font.files.regular, '_blank')
    win.focus()
    setDownloaded(true);
  };

  return [isDownloaded, onFontClick];
}

export default useDownloadOnClick

