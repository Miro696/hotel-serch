const LoadingButton = (props) => {

  const className = props.className || "btn-primary "
  const propsType = {...props}
  delete propsType.loading
  return props.loading ? (
    <button className={`btn ${className} mt-2`} type="button" >
      <span className="spinner-border spinner-border-sm"    role="status" aria-hidden="true"></span>
       <span className="sr only">Sending</span>
    </button>) 
       :<button {...propsType} className={`btn ${className} mt-2`} >{props.children}</button>
}

export default LoadingButton;