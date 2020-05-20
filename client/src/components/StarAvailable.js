import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


function StarAvailable(props) {
    const [gasValue, setGasValue] = useState(); 
    const [starValue, setStarValue] = useState();
    const [idValue, setIdValue] = useState();
    const [idGasValue, setTransferGas] = useState();

    if (props.owner === 'N/A') {
        return (
            <div className={'available'}>
                <section>Congrats, this star is available!</section>
                <br />
                <Button
                    onClick={async () => {
                        await props.createStar(props.starName).send({from: props.account});
                    }}
                >Claim Star <i className="fas fa-star"></i></Button>
            </div>
        );
    }
    return (
        <div className={'available'}>
                <code>You must send gas along with your purchase for the network to process your transaction. <br/>Common failure for star purchasing is <u>not providing enough gas.</u></code>
                <br/><br/>
                <code>The value you send for the star <u>must be greater than the amount the star is listed in wei</u>. You will be refunded the difference.</code>
                <br/><br/>
                <InputGroup className="mb-3">
                <FormControl
                  placeholder="Star amount to send"
                  aria-label="star"
                  aria-describedby="basic-addon2"
                  value={starValue}
                  onChange={e => {
                    setStarValue((e.target.value));
                  }}
                />
                <FormControl
                  placeholder="Gas amount to send"
                  aria-label="Gas"
                  aria-describedby="basic-addon2"
                  value={gasValue}
                  onChange={e => {
                    setGasValue((e.target.value));
                  }}
                />
                <InputGroup.Append>
                  <Button variant={'outline-success'} onClick={async () => {
                    await props.buyStar(props.tokenId).send({from: props.account, value: Number(starValue), gas: gasValue || '0'});
                }}>Buy Star <i className="fab fa-ethereum"></i></Button>
                </InputGroup.Append>
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  placeholder="ID of star you own"
                  aria-label="star"
                  aria-describedby="basic-addon2"
                  value={idValue}
                  onChange={e => {
                    setIdValue((e.target.value));
                  }}
                />
                <FormControl
                  placeholder="Gas amount to send"
                  aria-label="Gas"
                  aria-describedby="basic-addon2"
                  value={idGasValue}
                  onChange={e => {
                    setTransferGas((e.target.value));
                  }}
                />
                <InputGroup.Append>
                  <Button variant={'outline-primary'} onClick={async () => {
                    await props.exchangeStar(Number(idValue), props.tokenId).send({from: props.account, gas: idGasValue || '0'});
                }}>Swap Stars <i class="fas fa-exchange-alt"></i></Button>
                </InputGroup.Append>
              </InputGroup>
        </div>
    );
};


export default StarAvailable;