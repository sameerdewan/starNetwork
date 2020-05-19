import React from 'react';
import Jdenticon from 'react-jdenticon';
import Spinner from 'react-bootstrap/Spinner';


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
                isOwner: undefined
            },
            loading: true
        };
    }

    componentDidMount() {
        this.lookupStar();
    }

    async lookupStar() {
        if (this.state.searchType === 'id') {
            const {lookupStarById} = this.props.meta.methods;
            const _details = await lookupStarById(this.state.star).call();
            this.setState({
                details: {
                    name: _details[0],
                    tokenId: this.state.star,
                    forSale: _details[1],
                    price: _details[2],
                    owner: _details[3],
                    isOwner: _details[3] === this.state.account
                },
                loading: false
            });
            return;
        }
        if (this.state.searchType === 'name') {
            const {lookupStarByName} = this.props.meta.methods;
            const _details = await lookupStarByName(this.state.star).call();
            this.setState({
                details: {
                    name: this.state.star,
                    tokenId: _details[0],
                    forSale: _details[1],
                    price: _details[2],
                    owner: _details[3],
                    isOwner: _details[3] === this.state.account
                },
                loading: false
            });
            return;
        }
    }

    render() {
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
            <Jdenticon size="200" value={this.state.star} />
            {this.state.star}
        </div>
        );
    }
}

export default StarDetails;