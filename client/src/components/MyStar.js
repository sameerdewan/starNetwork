import React from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


function MyStar() {
    return (
      <div>
        You already own this star!
        <div className={'center available'}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Transfer to address"
                  aria-label="Address to Transfer"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button onClick={() => {
                  
                  }}>Transfer</Button>
                </InputGroup.Append>
              </InputGroup>
              or
              <br/> <br/>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Price to sell for"
                  aria-label="Put up for sale"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button onClick={() => {
                  
                  }}>List Star for Sale</Button>
                </InputGroup.Append>
              </InputGroup>
          </div>
      </div>
    );
  };

export default MyStar;