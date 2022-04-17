const errorMessageStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  'z-index': 1,
  width: '100%',
  padding: '5px',
  background: '#ff3b30',
  color: 'white',
  'text-align': 'center',
  'font-size': '1em',
  'font-weight': '500',
  'font-family': 'Arial, sans-serif',
};

const showNetworkError = (message) => {
  const errorMessageContainerElement = document.createElement('div');
  const errorDescriptionElement = document.createElement('p');

  Object.assign(errorMessageContainerElement.style, errorMessageStyles);

  errorDescriptionElement.textContent = message;

  errorMessageContainerElement.append(errorDescriptionElement);

  document.body.insertAdjacentElement(
    'afterbegin',
    errorMessageContainerElement
  );
};

export { showNetworkError };
