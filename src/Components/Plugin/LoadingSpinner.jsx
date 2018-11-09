
import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
const LoadingSpinner = ({size, color}) =>  {
  
  return (
      <div className='sweet-loading'>
      <center>
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={size?size:50}
          color={color?color:"green"}
          loading={true}
        />
        </center>
      </div> 
    )
}

export default LoadingSpinner