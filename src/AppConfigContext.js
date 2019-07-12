import React, { useState } from 'react'

function AppConfigContext(props){
  const [appConfigState, setAppConfigState] = useState( { bold: false, italic: false, color: 'black', size: 16, backgroundColor: 'white'  });
  return (
    <AppConfigContext.Provider value={[appConfigState, setAppConfigState]}>
      {props.children}
    </AppConfigContext.Provider>
  );
}

export default AppConfigContext