import React, {useEffect, useState} from 'react'
import DOCImage from '../assets/docThumbnail.png'
import DOCIcon from '../assets/doc.png'
import PDFImage from '../assets/PDFThumbnail.png'
import PDFIcon from '../assets/pdf.png'
import IMAGEIcon from '../assets/image.png'
import ANYImage from '../assets/any.jpg'
import ANYIcon from '../assets/zip.png'
import useFirestore from '../DataHooks/useFireStore'

function DisplayCarousel() {
    const { docs } = useFirestore('PICS');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [data, setData] = useState({})
    const [currentImage, setCurrentImage] = useState({});

    useEffect(() => {
        if(docs.length){
            console.log(docs);
            const temp = docs[currentIndex];
            const dateFormat = JSON.stringify(temp.createdAt.toDate().toDateString()).replace(/['"]+/g, '')
            const current = {
                name: temp.fileName,
                type : temp.fileType,
                date :  dateFormat
            }
            if(current.type == 'IMAGE'){
                setCurrentImage({ base : temp.url, icon : IMAGEIcon});
            }else if(current.type == 'WORD'){
                setCurrentImage({ base : DOCImage, icon : DOCIcon});
            }else if(current.type == 'PDF'){
                setCurrentImage({ base : PDFImage, icon : PDFIcon});
            }else if(current.type == 'ANY'){
                setCurrentImage({ base : ANYImage, icon : ANYIcon});
            }
            setData(current);
        }
       
    }, [docs])

    const setPreviousIndex = () => {
        if(currentIndex == 0) return;
        setCurrentIndex( lastIndex => lastIndex -1);
            const temp = docs[currentIndex -1];            
            const dateFormat = JSON.stringify(temp.createdAt.toDate().toDateString()).replace(/['"]+/g, '')
            const current = {
                name: temp.fileName,
                type : temp.fileType,
                date : dateFormat
            }
            if(current.type == 'IMAGE'){
                setCurrentImage({ base : temp.url, icon : IMAGEIcon});
            }else if(current.type == 'WORD'){
                setCurrentImage({ base : DOCImage, icon : DOCIcon});
            }else if(current.type == 'PDF'){
                setCurrentImage({ base : PDFImage, icon : PDFIcon});
            }else if(current.type == 'ANY'){
                setCurrentImage({ base : ANYImage, icon : ANYIcon});
            }
            setData(current);
    }

    const setNextIndex = () => {
        if(currentIndex == docs.length -1 ) return;
        setCurrentIndex( lastIndex => lastIndex + 1);
        const temp = docs[currentIndex +1];                
        const dateFormat = JSON.stringify(temp.createdAt.toDate().toDateString()).replace(/['"]+/g, '')
            const current = {
                name: temp.fileName,
                type : temp.fileType,
                date : dateFormat
            }
            if(current.type == 'IMAGE'){
                setCurrentImage({ base : temp.url, icon : IMAGEIcon, url:temp.url});
            }else if(current.type == 'WORD'){
                setCurrentImage({ base : DOCImage, icon : DOCIcon,  url:temp.url});
            }else if(current.type == 'PDF'){
                setCurrentImage({ base : PDFImage, icon : PDFIcon,  url:temp.url});
            }else if(current.type == 'ANY'){
                setCurrentImage({ base : ANYImage, icon : ANYIcon, url:temp.url});
            }
            setData(current);
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
