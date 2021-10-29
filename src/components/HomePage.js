import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import NavbarPics from "./NavbarPics"
import PicCarousel from "./PicCarousel"
import RowContainer from "./RowContainer"
import PIC_ARRAY from "./PictureImport"



export default function HomePage() {


const imageArray =PIC_ARRAY.map(pic => {
 //// console.log(pic);
  return pic;
})
function chunkArray(myArray, chunk_size){
  var results = [];
  
  while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
  }
  
  return results;
}

// Split in group of 3 items
var result = chunkArray(imageArray, 3);
//console.log(result);
  const Items = result.map( (row,index) => <RowContainer key= {index} imagesArray = {row}/>)

  console.log(Items);
  return (
    <>
     <NavbarPics></NavbarPics>
     <PicCarousel></PicCarousel>
     <div className='rowImg'>
       { Items.length ? Items : null}
     </div>
    </>
  )
}