import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import GeoLocation from '../api/GeoLocation';


function toSuggestArray (arr){
    var suggestions = [];
    for(var i=0; i<arr.length; i++) {
        suggestions.push({label: arr[i]});
    }
    return suggestions;
}

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}


function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    display: 'inline-block',
    marginTop: 20,
    width:225,
    background: 'white',
    padding:0,
    border:0
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  fa: {
   marginLeft: -10
  }
});



class AutoComplete extends React.Component {
  state = { 
      GeoLocation: new GeoLocation(),
      value: '', 
      suggestions: [],
      redirect: false, 
  }

  handleSuggestionsFetchRequested = async ({ value }) => {
    if(value.length>=3){
      const suggestionsList = await this.state.GeoLocation.getGeoLocation(value);
      this.setState({suggestions: toSuggestArray(suggestionsList)});
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onKeyDown(e) {
    if (e.keyCode === 13) { 
      this.setState({ redirect: true });
    }
 }

 handleSearch(e){
  e.preventDefault();
  this.setState({ redirect: true });
}

  render() {
    const { classes } = this.props;
    return (
      <div class="pull-right">
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: 'Search Country (eg. France) or Hobbies (eg. Art)',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      /> <i class="fa fa-search fa-border" style={styles.fa}></i>
      </div>
    );
  }
}

AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoComplete);
