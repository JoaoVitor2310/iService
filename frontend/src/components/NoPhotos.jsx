import React from 'react'

const NoPhotos = ({photos, msg, loading}) => {  
  return (
    <>
        {photos && photos.length === 0 && !loading &&(
            <h3 className='no-photos'>{msg}</h3>
        )}
    </>
  )
}

export default NoPhotos