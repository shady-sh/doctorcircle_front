const LoginTitle = (props) => {
  return (
    <div className="centered">
      <a href="/">
        <img
          alt="company_logo"
          src="./Assets/logo.png"
          style={{ marginBottom: `${props.mBottom}px` }}
        />
      </a>
      <h2
        style={{
          fontSize: `${props.fontSize}px`,
          marginBottom: `${props.hmBottom}px`,
        }}
      >
        {props.name}
      </h2>
    </div>
  );
};

export default LoginTitle;
