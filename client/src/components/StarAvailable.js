import React from 'react';
import Button from 'react-bootstrap/Button';


function StarAvailable() {
    return (
        <div className={'available'}>
            <section>Congradulations, this star is available!</section>
            <br />
            <Button>Claim Star</Button>
        </div>
    );
};


export default StarAvailable;