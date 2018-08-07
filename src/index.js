import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import { addField, FieldTitle } from 'ra-core';
import TextField from '@material-ui/core/TextField';
import * as ReactColor from 'react-color';
import get from 'lodash.get';
import pure from 'recompose/pure';

require('./ColorInput.css');

const ColorFieldComponent = ({ source, record = {}, className }) =>
  (
    <div style={{ display: 'flex' }}>
      <div style={{
        width: '20px',
        height: '20px',
        background: get(record, source),
        marginRight: '5px',
      }}
      />
      <span className={className}>{get(record, source)}</span>
    </div>
  );

ColorFieldComponent.propTypes = {
  addLabel: PropTypes.bool,
  className: PropTypes.string,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

const PureTextField = pure(ColorFieldComponent);

PureTextField.defaultProps = {
  addLabel: true,
};

class ColorInputComponent extends React.Component {
  state = {
    show: false
  };

  handleOpen = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });
  handleChange = ({ hex }) => {
    this.props.input.onChange(hex);
    this.forceUpdate();
  };

  render() {
    const {
      label,
      source,
      meta,
      className,
      options,
      picker,
      input,
      resource,
      isRequired,
    } = this.props;

    const {
      touched,
      error,
    } = meta;

    const Picker = ReactColor[`${picker}Picker`];

    return (
      <div>
        <TextField
          {...input}
          margin="normal"
          onFocus={this.handleOpen}
          label={
            <FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
            />
          }
          error={!!(touched && error)}
          helperText={touched && error}
          className={className}
        />
        {
          this.state.show?
            <div className="ColorInput-popup">
              <div
                className="ColorInput-cover"
                onClick={this.handleClose}
              />
              <Picker
                {...options}
                color={input.value}
                onChange={this.handleChange}
              />
            </div>
            : null
        }
      </div>
    )
  }
};

ColorInputComponent.propTypes = {
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  className: PropTypes.string,
  picker: (props, propName, componentName) =>
    !ReactColor[`${props[propName]}Picker`] &&
    new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`.`)
};

ColorInputComponent.defaultProps = {
  picker: 'Chrome',
  options: {
    disableAlpha: true
  },
};

export const ColorField = PureTextField;
export const ColorInput = addField(ColorInputComponent);