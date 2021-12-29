import React, {useEffect, useState} from 'react'
import DOCImage from '../assets/docThumbnail.png'
import DOCIcon from '../assets/doc.png'
import PDFImage from '../assets/PDFThumbnail.png'
import PDFIcon from '../assets/pdf.png'
import IMAGEIcon from '../assets/image.png'
import ANYImage from '../assets/any.jpg'
import ANYIcon from '../assets/zip.png'
import useFirestore from '../DataHooks/useFireStore'


const setDisplayData = (data) => {
    const dateFormat = JSON.stringify(data.createdAt.toDate().toDateString()).replace(/['"]+/g, '')
    const current = {
        name: data.fileName,
        type : data.fileType,
        date : dateFormat
    }
    if(current.type == 'IMAGE'){
        current.imageData = { base : data.url, icon : IMAGEIcon, url:data.url};
    }else if(current.type == 'WORD'){
        current.imageData = { base : DOCImage, icon : DOCIcon,  url:data.url};
    }else if(current.type == 'PDF'){
        current.imageData = { base : PDFImage, icon : PDFIcon,  url:data.url};
    }else if(current.type == 'ANY'){
        current.imageData = { base : ANYImage, icon : ANYIcon, url:data.url};
    }

    return current;

}

function DisplayCarousel() {
    const { docs } = useFirestore('PICS');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState({})
    const [currentImage, setCurrentImage] = useState({});

    useEffect(() => {
        if(docs.length){
            const current =  setDisplayData(docs[currentIndex]);
            
            setData(current);
            setCurrentImage(current.imageData);
        }
       
    }, [docs])

    const setPreviousIndex = () => {
        if(currentIndex == 0) return;

        setCurrentIndex( lastIndex => lastIndex -1);
        const current =  setDisplayData(docs[currentIndex -1]);
            
        setData(current);
        setCurrentImage(current.imageData);
    }

    const setNextIndex = () => {
        if(currentIndex == docs.length -1 ) return;

        setCurrentIndex( lastIndex => lastIndex + 1);
        const current =  setDisplayData(docs[currentIndex + 1]);
            
        setData(current);
        setCurrentImage(current.imageData);
    }
    
    

 
    return (
       
        <div className="ImageContainer">
            {
                docs.length ?  <>
                <a  href={currentImage.url} target="_blank">
                <img className = {(data.type == 'IMAGE') ? 'imageFile' : 'otherFile'} src={currentImage.base} alt="" /> 
                </a>             

                
                <button className="prev" onClick={(e) => setPreviousIndex()}>Prev</button>
                <button className="next" onClick={(e) => setNextIndex()}>Next</button>
                <div className='details'>
                    <img src={currentImage.icon} alt="" style={{paddingRight : '1em'}}/> <span style={{fontSize : '1.2em', fontWeight: '600'}}>{data.name}</span>
                    <br/>
                    <span style={{fontSize : 'small', color : '#808080'}}>{`Date Uploaded - ${data.date}`}</span>
                </div>
                </> : <h2 style={{fontStyle : 'italic', color : '#808080'}}>Loading.....</h2>
            }
        </div>
    )
}

export default DisplayCarousel
