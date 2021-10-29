import React from 'react'
import ImageCard from './ImageCard'

function RowContainer({imagesArray}) {
    
     const imagesRow = imagesArray.map((image, index) => <ImageCard key={index} image={image} />)
    return (
        
        <div style={{paddingTop : '35px'}}>
             { imagesRow.length ? imagesRow : null}
        </div>
        
        );
}

export default RowContainer
