import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Link from "next/link";
import { Message, Icon } from "semantic-ui-react";
import css from "./SigninComponent.css";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => {
    if (loading) {
      return (
        <React.Fragment>
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are working on it. Thank you for your patience.
            </Message.Content>
          </Message>
        </React.Fragment>
      );
    }
  };
  const showError = () => {
    if (error) {
      return (
        <React.Fragment>
          <Message
            error
            header="There was some errors with your submission"
            list={[error]}
          />
        </React.Fragment>
      );
    }
  };
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <div className={css.container}>
        <h2 className={css.h2}>Sign-In</h2>
        <Form className={css.formtop} onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <input
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control"
            />
          </FormGroup>

          <div>
            <button className={css.button}>Sing-In to your account</button>
          </div>
          <hr />
          <div className={css.accountsign}>
            New here? Please{" "}
            <Link href="/signup">
              <a>Create your account</a>
            </Link>
          </div>
        </Form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SigninComponent;
