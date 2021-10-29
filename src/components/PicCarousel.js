import React, {useState} from 'react'
import { Carousel, Container } from "react-bootstrap"
import Banner1 from '../pics/Banner1.jpg'
import Banner2 from '../pics/Banner2.jpg'
import Banner3 from '../pics/Banner3.jpg'
import Banner4 from '../pics/Banner4.jpg'


function PicCarousel() {
    
  const [index, setIndex] = useState(0);
  const BannerArray = [Banner1, Banner2, Banner3, Banner4]

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
    return (
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
            {
                BannerArray.map( (pic, i) => {
                    return (
                    <Carousel.Item key = {i} >
                    <img
                      className="d-block"
                      src= {pic}
                      alt={`${i} slide`}
                    />
                    <Carousel.Caption>
                      <h3>{`${i + 1} slide Label`}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>)
            

                })
            }
        </Carousel>
    )
}

export default PicCarousel
