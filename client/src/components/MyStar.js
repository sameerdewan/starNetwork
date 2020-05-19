import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


function MyStar(props) {
  const [transferValue, setTransferValue] = useState('');
    return (
      <div>
        You own this star!
        <div className={'center available'}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Transfer to address"
                  aria-label="Address to Transfer"
                  aria-describedby="basic-addon2"
                  value={transferValue}
                  onChange={e => {
                    setTransferValue(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button onClick={async () => {
                    try {
                      await props.transferStar(transferValue, props.tokenId).send({from: props.account});
                    } catch (error) {
                      console.log({error})
                    }
                  }}>Transfer</Button>
                </InputGroup.Append>
              </InputGroup>
              or
              <br/> <br/>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Price to barter for"
                  aria-label="Put up for sale"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button onClick={() => {
                  
                  }}>List Barter</Button>
                </InputGroup.Append>
              </InputGroup>
          </div>
      </div>
    );
  };

export default MyStar;