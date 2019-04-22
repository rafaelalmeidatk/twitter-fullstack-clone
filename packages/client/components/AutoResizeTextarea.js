import React, { useRef } from 'react';

const AutoResizeTextarea = ({ onInput, ...props }) => {
  const textareaEl = useRef(null);

  const handleChange = (...args) => {
    textareaEl.current.style.height = 'auto';
    const computed = window.getComputedStyle(textareaEl.current);
    const height =
      parseInt(computed.getPropertyValue('border-top-width')) +
      parseInt(computed.getPropertyValue('border-bottom-width')) +
      textareaEl.current.scrollHeight;
    textareaEl.current.style.height = height + 'px';

    // Forward the event
    onInput && onInput(...args);
  };

  return <textarea ref={textareaEl} onInput={handleChange} {...props} />;
};

export default AutoResizeTextarea;
