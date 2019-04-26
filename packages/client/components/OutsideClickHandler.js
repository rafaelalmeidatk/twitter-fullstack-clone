import React, { useEffect, useRef, useCallback } from 'react';

const OutsideClickHandler = ({ onOutsideClick, children }) => {
  const childEl = useRef();

  const handleDocumentClick = useCallback(
    e => {
      if (!childEl.current) return;
      const clickIsInsideOfChild = childEl.current.contains(e.target);
      if (!clickIsInsideOfChild) {
        onOutsideClick(e);
      }
    },
    [onOutsideClick]
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleDocumentClick, {
        capture: true,
      });
    };
  }, [handleDocumentClick]);

  return <div ref={childEl}>{children}</div>;
};

export default OutsideClickHandler;
