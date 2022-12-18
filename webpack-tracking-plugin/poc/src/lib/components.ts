/**
 * Example mocking components
 */

export const ConfirmButton = () => { 
  const button =  document.createElement("button");
  button.innerText = "Confirm";
  return button;
};

export const CancelButton = () => {
  const button =  document.createElement("button");
  button.innerText = "Cancel";
  return button;
};
 
