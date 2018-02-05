'use strict';

import React from 'react';

// app component
export default function App( props ) {
  return (
    <div className="container" >
      { props.children }
    </div>
  );
}
