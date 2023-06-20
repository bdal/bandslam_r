import React from 'react'

import SearchTable from './SearchTable'
import MediaTable from './MediaTable'
import TimelineTable from './TimelineTable'

const BandslamTable = ({videos}) => {
  return (
    <div>
        <SearchTable/>
        <MediaTable videos={videos}/>
        <TimelineTable/>
    </div>
    
  )
}

export default BandslamTable