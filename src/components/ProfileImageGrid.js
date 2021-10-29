import React from 'react'
import useFirestore from '../DataHooks/useFireStore'

function ProfileImageGrid() {
    
  const { docs } = useFirestore('PICS');

    return (
        <div className="imgGrid">
            {docs && docs.map(image => <div key={image.id} className='imgCol'><img src={image.url} alt='name'/></div> ) }
        </div>
    )
}

export default ProfileImageGrid
