import React from 'react';
import Jdenticon from 'react-jdenticon';


class StarDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        starName: props.match.params.starName
        };
    }

    componentDidMount() {
    }

    render() {
        return (
        <div className={'star-details'}>
            <Jdenticon size="200" value={this.state.starName} />
            {this.state.starName}
        </div>
        );
    }
}

export default StarDetails;