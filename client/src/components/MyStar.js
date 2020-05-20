import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


function MyStar(props) {
  const [transferValue, setTransferValue] = useState('');
  const [priceValue, setPriceValue] = useState();
    return (
      <div>
        <code><b><u>You own this star!</u></b></code>
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
                  }}>Transfer <i className="fas fa-paper-plane"></i></Button>
                </InputGroup.Append>
              </InputGroup>
              or
              <br/> <br/>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Price to barter wei"
                  aria-label="Put up for sale"
                  aria-describedby="basic-addon2"
                  value={priceValue}
                  onChange={e => {
                    setPriceValue(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button onClick={async () => {
                    try {
                      await props.listStarForBarter(props.tokenId, priceValue).send({from: props.account});
                    }  catch (error) {

                    }
                  }}>List Barter <i className="fas fa-hand-holding-usd"></i></Button>
                </InputGroup.Append>
              </InputGroup>
          </div>
      </div>
    );
  };

export default MyStar;