import React from 'react'

const VideoTable = ({videos}) => {
  return (
    <div>
        {videos.map((task) =>(
            <p>{task.artistName} - {task.venueName}</p>
        ))}
    </div>
  )
}

export default VideoTable