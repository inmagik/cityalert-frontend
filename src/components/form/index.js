import React, { Component } from "react";
import FieldPosition from './FieldPosition'
import { Input, FormGroup, Label, FormFeedback, FormText } from "reactstrap";

export { FieldPosition }

const arrayze = a => (Array.isArray(a) ? a : [a]);

export const FieldInput = ({
  input,
  meta,
  label,
  type,
  labelProps,
  children,
  ...passProps
}) => (
  <FormGroup>
    {label && <Label>{label}</Label>}
    <Input
      type={type}
      {...input}
      {...passProps}
      invalid={!!(meta.touched && meta.error)}
    >
      {children}
    </Input>
    {meta.touched &&
      meta.error &&
      arrayze(meta.error).map((error, i) => (
        <FormFeedback key={i}>{error}</FormFeedback>
      ))}
  </FormGroup>
);

FieldInput.defaultProps = {
  type: "text"
};


const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

export class FieldFile extends Component {

  state = { image: null }

  componentDidMount() {
    const file = this.props.input.value
    this.reader = new FileReader()

    if (file) {
      this.reader.addEventListener('load', this.onImageLoaded)
      this.reader.readAsDataURL(file)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      if (this.reader) {
        this.reader.removeEventListener('load', this.onImageLoaded)
      }
      const file = nextProps.input.value
      if (file) {
        this.reader = new FileReader()

        this.reader.addEventListener('load', this.onImageLoaded)
        this.reader.readAsDataURL(file)
      } else {
        this.setState({ image: null })
      }
    }
  }

  componentWillUnmount() {
    if (this.reader) {
      this.reader.removeEventListener('load', this.onImageLoaded)
    }
  }

  onImageLoaded = e => {
    this.setState({ image: e.target.result })
  }

  clear = () => {
    if (this.file) {
      this.file.value = null
    }
    this.props.input.onChange(null)
  }

  render() {
    const {
      label,
      input: {
        value,
        onChange,
        onBlur,
        ...inputProps,
      },
      meta,
      ...props,
    } = this.props

    return (
      <FormGroup>
        {label && <Label>{label}</Label>}
        <Input
          onChange={adaptFileEventToValue(onChange)}
          onBlur={adaptFileEventToValue(onBlur)}
          type="file"
          className=""
          innerRef={r => this.file = r}
          {...inputProps}
          {...props}
        />
        {/* Ok we got the uploaded url insted of file descriptor show file link */}
        {typeof value === 'string' && (
          <FormText><a href={value} target='_blank'>{value}</a></FormText>
        )}
        {value && (
          <FormText className='pointer hover-underline' onClick={this.clear}>
            <i className='fa fa-times' />
            {' '}
            Clear
          </FormText>
        )}
        {this.state.image && <img
          style={{ height: 400, width: 400, borderRadius: 0, objectFit: 'cover' }}
          alt={this.props.input.value.name}
          name={this.props.input.value.name}
          src={this.state.image}
          className='img-thumbnail mx-1 my-1'
        />}
        {meta.touched && meta.error && arrayze(meta.error).map((error, i) => (
          <FormText color='danger' key={i}>{error}</FormText>
        ))}
      </FormGroup>
    )
  }

}
