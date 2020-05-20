import React from 'react';
import Jdenticon from 'react-jdenticon';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import MyStar from './MyStar';
import StarAvailable from './StarAvailable';

class StarDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            star: props.match.params.star,
            searchType: props.match.params.searchType,
            account: props.account,
            details: {
                name: undefined,
                tokenId: undefined,
                forSale: undefined,
                price: undefined,
                owner: undefined,
                isOwner: undefined,
            },
            loading: true,
            couldNotFind: undefined
        };
    }

    componentDidMount() {
        this.lookupStar();
    }

    async lookupStar() {
        // return await this.props.meta.methods.createStar('Sameer').send({from: this.state.account});
        if (this.state.searchType === 'id') {
            const {lookupStarById} = this.props.meta.methods;
            try {
                const _details = await lookupStarById(`${this.state.star}`).call();
                this.setState({
                    details: {
                        name: _details[0],
                        tokenId: this.state.star,
                        forSale: _details[1],
                        price: _details[2],
                        owner: _details[3],
                        isOwner: _details[3] === this.state.account
                    },
                    loading: false,
                    couldNotFind: false
                });
                return;
            } catch (error) {
                this.setState({loading: false, couldNotFind: true});
            }
            
        }
        if (this.state.searchType === 'name') {
            const {lookupStarByName} = this.props.meta.methods;
            const _details = await lookupStarByName(this.state.star).call();
            const originator = '0x6E00000000000000000000000000000000000000';
            this.setState({
                details: {
                    name: this.state.star,
                    tokenId: _details[3] === originator ? 'N/A' : _details[0],
                    forSale: _details[1],
                    price: _details[2],
                    owner: _details[3] === originator ? 'N/A' : _details[3],
                    isOwner: _details[3] === this.state.account
                },
                loading: false
            });
            return;
        }
        
    }

    renderDetails() {
        if (this.state.details.isOwner === true) {
            return (
                <MyStar 
                    transferStar={this.props.meta.methods.transferStar} 
                    listStarForBarter={this.props.meta.methods.listStarForBarter}
                    tokenId={this.state.details.tokenId} 
                    account={this.state.account}
                />
            );
        }
        if (this.state.details.owner === 'N/A') {
            return (
                <StarAvailable
                    owner={this.state.details.owner}
                    account={this.state.account}
                    createStar={this.props.meta.methods.createStar}
                    starName={this.state.star}
                />
            );
        }
        if (this.state.details.forSale === true) {
            console.log(this.state.details.price)
            return (
                <StarAvailable 
                    owner={this.state.details.owner}
                    account={this.state.account}
                    buyStar={this.props.meta.methods.buyStar}
                    tokenId={this.state.details.tokenId}
                    price={this.state.details.price}
                />
            );
        }
        if (this.state.details.forSale === false) {
            // StarUnavailable
        }
    }

    render() {
        if (this.state.loading === false && this.state.couldNotFind === true && this.state.searchType === 'id') {
            return (
                <div className={'center'}>
                    <span className={'first4'}>4</span>
                    <span className={'star'}>★</span>
                    <span className={'last4'}>4</span>
                    <br />
                    <b>Oops, looks like this one was sucked into a black hole somewhere.</b>
                    <br /><br/>
                    <span className={'descr'}>A star with the id <u>{this.state.star}</u> could not be found.</span>
                    <br />
                    <br />
                    <Button onClick={() => this.props.history.push('/')}>Go back</Button>
                </div>
            );
        }
        if (this.state.loading === true) {
            return (
                <div className={'center'}>
                    <Spinner animation="grow" variant="primary" size="lg" />
                    <br/><br/>
                    Looking up star {this.state.searchType} {this.state.star}...
                </div>
            );
        }
        return (
            <div className={'star-details'}>
                <div className={'note-nest'}>
                    <center><b><i className="fas fa-exclamation-circle"></i></b></center>
                    <center><b><code>Important</code></b></center>
                    <code className={'note'}>
                        <br/>If you have interacted with this token, <u>refresh the page once you receive confirmation from Metamask</u> of
                         a successful transaction. Otherwise, the information on this page may be outdated.
                    </code> 
                </div>
                <Jdenticon size="200" value={this.state.details.name} />
                <b>Star</b>: {this.state.details.name}
                <br/>
                <b>Id</b>: {this.state.details.tokenId}
                <br/>
                {
                    this.state.details.owner !== 'N/A' ?
                    <><b>Owner:</b> {this.state.details.owner}<br/><br/></> : <br/>
                }
                {this.state.details.forSale === true && this.state.details.owner !== 'N/A' ? 
                <code>For Sale: <i className="fab fa-ethereum"></i>{this.state.details.price} ETH</code> : ''}
                {this.state.forSale === true ? <hr/> : ''}
                <br/><br/>
                {(this.state.details.forSale === true && this.state.details.isOwner === true) ? 
                    <Button 
                        onClick={async () => {
                            const {listStarForBarter} = this.props.meta.methods;
                            await listStarForBarter(this.state.details.tokenId, '0').send({from: this.state.account});
                        }}
                        variant="outline-danger">Remove Listing <i className="far fa-trash-alt"></i></Button> : ''
                }
                <hr />
                {this.renderDetails()}
            </div>
        );
    }
}

export default StarDetails;