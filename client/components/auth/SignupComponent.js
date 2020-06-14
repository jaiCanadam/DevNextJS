import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import Link from "next/link";
import Router from "next/router";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
var window = require("global/window");
var document = require("global/document");
import FacebookLogin from "react-facebook-login";
import { Message, Icon } from "semantic-ui-react";
import css from "./SignupComponent.css";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "test",
    email: "",
    password: "123123qqq",
    phone: "1231231231",
    error: "",
    loading: false,
    message: "",
    showForm: true,
    success: false,
  });
  const {
    name,
    email,
    password,
    phone,
    error,
    loading,
    message,
    showForm,
    success,
  } = values;
  // Get the modal
  var modal = document.getElementById("myModal");

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password, phone };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          phone: "",
          loading: false,
          message: data.message,
          success: true,
          showForm: false,
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
  //error ? <div className="alert alert-danger">{error}</div> : "";

  // When the user clicks on <span> (x), close the modal
  const modalClose = () => {
    myModal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  //   window.onclick = function (event) {
  //     if (event.target == modal) {
  //       myModal.style.display = "none";
  //     }
  //   };

  const showSuccess = () => {
    if (success == true) {
      return (
        <React.Fragment>
          <div className={css.modal} id="myModal">
            <div className={css.modalcontent}>
              {/*<span className={css.close} onClick={modalClose}>
                &times;
      </span>*/}
              New account is created. Please{" "}
              <Link href="/signin">
                <a>Sign-In</a>
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    }
  };

  // Alternate for success  message as  alert test
  //   const showMessage = () =>
  //     message ? (
  //       <div className="alert alert-info">
  //         New account is created. Please{" "}
  //         <Link href="/signin">
  //           <a>Signin</a>
  //         </Link>
  //       </div>
  //     ) : (
  //       ""
  //     );

  const signupForm = () => {
    return (
      <React.Fragment>
        <div className={css.container}>
          <h2 className={css.h2}>Create Account</h2>
          <Form className={css.formtop} onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Your Name</Label>
              <input
                value={name}
                onChange={handleChange("name")}
                className="form-control"
                type="text"
                placeholder="Name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Your Email</Label>
              <input
                value={email}
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <input
                value={phone}
                onChange={handleChange("phone")}
                className="form-control"
                type="number"
                placeholder="Phone number"
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                placeholder="Password"
              />
            </FormGroup>
            <button className={css.button}>Create your account</button>
            {/*<button class="btn btn-primary">Create Your Account</button>*/}
            <hr />

            <div class="col">
              <a href="#" className={css.fb}>
                <i class="fa fa-facebook fa-fw"></i> Sign-up with Facebook
              </a>
            </div>
          </Form>
          <hr />
          <div className={css.accountsign}>
            Already have an account? Please{" "}
            <Link href="/signin">
              <a>Sign-In</a>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}

      {showSuccess()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
