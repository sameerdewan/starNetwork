import React from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

class SearchStars extends React.Component {
    constructor() {
      super();
      this.state = {
        searchValue: ''
      }
    }
    render() {
      return (
        <div className={'center'}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for a star..."
                aria-label="Star name"
                aria-describedby="basic-addon2"
                onChange={e => this.setState({searchValue: e.target.value})}
                value={this.state.searchValue}
              />
              <InputGroup.Append>
                <Button variant="outline-primary" onClick={() => {
                  if (this.state.searchValue.trim() === '') return;
                  this.props.history.push(`/stars/name/${this.state.searchValue}`);
                }}>Search name</Button>
                <Button variant="outline-primary" onClick={() => {
                  if (this.state.searchValue.trim() === '') return;
                  this.props.history.push(`/stars/id/${this.state.searchValue}`);
                }}>Search tokenId</Button>
              </InputGroup.Append>
            </InputGroup>
        </div>
      );
    }
  };

  export default SearchStars;