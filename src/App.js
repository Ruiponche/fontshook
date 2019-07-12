import React, { useEffect, createContext, useState } from 'react'
import axios from 'axios'
import WebFont from 'webfontloader'
import FontSelect from './components/FontSelect'
import FontPreview from './components/FontPreview'
import './App.scss'

export const AppConfigContext = createContext();

function addOrRemove(array, value) {
  var index = array.indexOf(value);

  if (index === -1) {
      array.push(value);
  } else {
      array.splice(index, 1);
  }
  return array
}

function loadAllFonts(fontsResult){
  fontsResult.forEach(font=> {
    WebFont.load({
    google: {
      families: [`${font.family}:300,400,700`, 'sans-serif']
    }
  });
  })
}

function applyFontFilters(fontsResult, filters){
  let fontsFiltered = []
  if(filters.selectedFonts.length > 0){
    filters.selectedFonts.forEach(function(fontName){
      fontsFiltered.push(fontsResult.filter(font => font.family === fontName)[0])
      }
    )
    return fontsFiltered
  }else{return fontsResult}
}

function App() {
  const [fontsResult, setFontsResult] = useState([]);
  const [sampleText, setSampleText] = useState('');
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [filters, setFilters] = useState({ lenght: 24, selectedFonts: [] })
  const [appConfig, setAppConfig] = 
    useState({ 
      bold: false, 
      italic: false, 
      color: 'black', 
      size: 16, 
      backgroundColor: 'white',
      weight: '400'  
    })

  useEffect(() => {
    axios
      .get("https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=YOUR_API_giKEY")
      .then(result => {
        const fontsResult = result.data.items.slice(0,30)
        setFontsResult(fontsResult)
      })
  }, []);

  useEffect(()=>{
    const fontsFiltered = applyFontFilters(fontsResult, filters)
    setFilteredFonts(fontsFiltered)
  }, [fontsResult, filters])
  
  useEffect(()=>{
    loadAllFonts(fontsResult)
  }, [fontsResult])

  console.log(appConfig)

  return (
    <AppConfigContext.Provider value={appConfig}>
      <div className="App">
        <div id='tool-panel'>
          <textarea id='sample-text-input' onChange={(event)=>setSampleText(event.target.value)}/>
          <button onClick={()=>setAppConfig({...appConfig, italic: !appConfig.italic})}>italic</button>
          <input placeholder='font size' onChange={(event)=>setAppConfig({...appConfig, size: parseInt(event.target.value)})}/>
          <select onChange={(event)=>setAppConfig({...appConfig, weight: event.target.value})}>
            <option value="300">300</option>
            <option value="regular">400</option>
            <option value="700">700</option>
          </select>
          <input placeholder='font color' onChange={(event)=>setAppConfig({...appConfig, color: event.target.value})}/>
          <input placeholder='background color' onChange={(event)=>setAppConfig({...appConfig, backgroundColor: event.target.value})}/>
          <div>
            {
              fontsResult.map((font, index)=> {
              return (
                <FontSelect
                  key={`select-${index}`}
                  font={font}
                  onChange={()=>setFilters({...filters, selectedFonts: addOrRemove(filters.selectedFonts,font.family )})}
                />
              )
            })        
            }
          </div>
        </div>
        <div id='preview-grid'>
          {
            filteredFonts.map((font, index)=> {
              return (
                <FontPreview
                  key={`preview-${index}`}
                  font={font}
                  sampleText={sampleText}
                />
              )
            })
          }
        </div>
      </div>
    </AppConfigContext.Provider>
  )
}

export default App;
