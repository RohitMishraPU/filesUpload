import React from 'react'
import styled from 'styled-components'


function ImageCard({image}) {
    const ImageDiv = styled.div`
    
        position :relative;
        width: 300px;
        min-height: 400px;
        border-radius: 8px;
        background-color: #fff;
        margin: 50px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .2);  
        :before,
        :after{
            content: '';
            position :absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            background: #fff;
            transition: 0.5s;
            z-index: -1;
        }
        :hover:after{
            transform: rotate(15deg);
            box-shadow: 0 2px 20px rgba(0, 0, 0, .2);
            
        }
        :hover:before{
            transform: rotate(7.5deg);
            box-shadow: 0 2px 20px rgba(0, 0, 0, .2);
            
        }
        :hover div{
            &.imgBox {

                bottom : 80px;

             }
        }
        div {
          &.imgBox { 
            position :absolute;
            top: 10px;
            left: 10px;
            bottom : 10px;
            right  : 10px;
            background: #222;
            transition: 0.5s;
            z-index: 1;
            }
            &.imgBox img{
                position : absolute;
                 top : 0;
                left :0;
                width :100%;
                height :100%;
                object-fit : 'cover'
            }
            &.imgDetails { 
                position :absolute;
                left: 10px;
                bottom : 10px;
                right  : 10px;
                height : 60px;
                text-align : center;
                
            }
            &.imgDetails h2{ 
                margin : 0;
                padding : 0;
                font-size : 18px;
                font-weight: 600;
            }
            &.imgDetails h2 span{ 
                margin : 0;
                padding : 0;
                font-size : 16px;
                color : #f38695;
                
            }
        }
    `;
    return (
         <ImageDiv>
            <div className='imgBox'>
                <img src={image} alt= 'iaccfsa' />
                
            </div>
            <div className='imgDetails'>
                <h2>
                    Picture Name
                    <br></br>
                <span>
                    Price details
                </span>
                </h2>
                
            </div>

        </ImageDiv>
           
    )
}

export default ImageCard
