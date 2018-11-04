
import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
      <center>
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={50}
          color={"green"}
          loading={this.state.loading}
        />
        </center>
      </div> 
    )
  }
}