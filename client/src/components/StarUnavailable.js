import React from 'react';


function StarUnavailable() {
    return (
      <div className={'center'}>
        <code><b>Sorry, this star is taken and not up for barter!</b></code>
        <br/>
        <code style={{fontSize: '50px'}}>
          <i class="fas fa-sad-tear"></i>
          <i class="far fa-sad-tear"></i>
          <i class="fas fa-sad-tear"></i>
          <i class="far fa-sad-tear"></i>
          <i class="fas fa-sad-tear"></i>
          <i class="far fa-sad-tear"></i>
          <i class="fas fa-sad-tear"></i>
          <i class="far fa-sad-tear"></i>
        </code>
      </div>
    );
  };

  export default StarUnavailable;