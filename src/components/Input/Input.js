import { useRef } from 'react';

const InputText = (props) => {
  return(
    <div>
      <label>{props.label}</label>
        <input
          value={props.value}
          type={props.type}
          onChange={e => props.onChange(e.target.value)}
          className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">
          {props.error}
        </div>
    </div>
  )
}
const InputTextarea = (props) => {
  return(
    <div>
      <label>{props.label}</label>
        <textarea
          value={props.value}
          type="text"
          onChange={e => props.onChange(e.target.value)}
          className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">
          {props.error}
        </div>
    </div>
  )
}

// *********************************************************
const InputSelect = (props) => {
  return(
    <div className="form-group">
      <label>{props.label}</label>
        <select  
          className="form-control"  
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}>
            {props.options.map(option =>
            <option key={option.value} value={option.value}>{option.label}</option>
              )}
        </select>
        <div className="invalid-feedback">
          {props.error}
        </div>
    </div>
  )
}
// ****************************************************************
const InputCheckbox = (props) => {
  
  const changeFeaturesHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if(isChecked) {
      const newValue = [...props.value, value];
      props.onChange(newValue)
    } else {
      const newValue = props.value.filter(x => x !== value)
      props.onChange(newValue)
    }
  }

return(
  <div className="form-group">
    {props.options.map(option => (
    <div className="custom-control custom-checkbox" key={option.value}>
      <input 
        type="checkbox"
        className="custom-control-input"
        id={option.value}
        value={option.value}
        checked={props.value.find(x => x === option.value) || false}
        onChange={changeFeaturesHandler}
        />
      <label 
      htmlFor={option.value}  
      className="custom-control-label">{option.label}</label>
    </div>
    ))}
  </div>
  )
}
// ********************************************************
const InputFile = (props) => {
  const imageRef = useRef();

  const changeHandler = (e) => {
    props.onChange(e.target.files[0]);
  }
  return(
    <div className="form-group">
      <label>Photo</label>
      <input 
      type="file"
      onChange={changeHandler} 
      ref={imageRef}/>
   </div>
  )
}

const InputRadio = (props) => {
  return(
    <div className="form-group">
    {props.options.map(option => (
      <div className="custom-control custom-radio" key={option.value}>
      <input 
        type="radio" 
        name={props.name} 
        id={`radio-${option.value}-${props.name}`}
        className="custom-control-input"
        value={option.value}
        checked={props.value === option.value}
        onChange={e => props.onChange(e.target.value)}
      />
      <label className="custom-control-label" htmlFor={`radio-${option.value}-${props.name}`}>{option.label}</label>
    </div>
    ))}
  </div>
  )
}

const Input = (props) => {
  switch(props.type) {
    case 'select':
    return <InputSelect {...props}/>
    case 'password':
    return <InputText {...props} type="password"/>
    case 'email':
    return <InputText {...props} type="email"/>
    case 'checkbox':
    return <InputCheckbox {...props}/>
    case 'file':
    return <InputFile {...props}/>
    case 'radio':
    return <InputRadio {...props}/>
    case 'textarea':
    return <InputTextarea {...props}/>
      default:
        return <InputText {...props}/>
  }
}

Input.defaultProps = {
  type: 'text',
  error: false,
  showError: false
}

export default Input;