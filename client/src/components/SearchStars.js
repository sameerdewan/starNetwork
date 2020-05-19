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
                placeholder="Search for a star name..."
                aria-label="Star name"
                aria-describedby="basic-addon2"
                onChange={e => this.setState({searchValue: e.target.value})}
                value={this.state.searchValue}
              />
              <InputGroup.Append>
                <Button onClick={() => {
                  if (this.state.searchValue.trim() === '') return;
                  this.props.history.push(`/stars/${this.state.searchValue}`);
                }}>Search</Button>
              </InputGroup.Append>
            </InputGroup>
        </div>
      );
    }
  };

  export default SearchStars;