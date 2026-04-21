class FormContactSelector {
  formContactSelector = {
    input_fullname: "input[id='fullname']",
    input_email: "input[id='email']",
    input_subject: "select[id='subject']",
    input_message: "textarea[id='message']",
    btn_submit: "button[type='submit']",
    msg_error_email: "[data-testid='error-email']",
    msg_error_fullname: "[data-testid='error-fullname']",
    msg_error_subject: "[data-testid='error-subject']",
    msg_error_message: "[data-testid='error-message']",
    msg_success: "[data-testid='submit-status']",
  };
}
const formContactSelectorInstance = new FormContactSelector();
export default formContactSelectorInstance;
