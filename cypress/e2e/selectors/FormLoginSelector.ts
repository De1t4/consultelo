class FormLoginSelector {
  formLoginSelector = {
    input_email: "input[type='email']",
    input_password: "input[type='password']",
    btn_submit: "button[type='submit']",
    msg_error: "User or password incorrect. Please try again.",
  };
}
const formLoginSelectorInstance = new FormLoginSelector();
export default formLoginSelectorInstance;
