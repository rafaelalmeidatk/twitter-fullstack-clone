import React from 'react';
import colors from '../../lib/colors';
import UnderlineButton from 'components/UnderlineButton';
import Icon from 'components/Icon';

const NavButton = ({ text, icon, iconSelected, selected, ...props }) => (
  <UnderlineButton className="nav-button" selected={selected} {...props}>
    <div className="icon">
      <Icon
        name={selected && iconSelected ? iconSelected : icon}
        size="1.4em"
      />
    </div>

    {text}

    <style jsx>{`
      :global(.nav-button) {
        cursor: pointer;
      }
      :global(.nav-button.selected) .icon :global(i),
      :global(.nav-button:hover) .icon :global(i),
      :global(.nav-button:focus) .icon :global(i) {
        color: ${colors.twitterBlue};
      }
      .icon {
        width: 23px;
        height: 23px;
        margin-top: -2px;
        margin-right: 6px;
      }
      .icon :global(.Icon.Icon--home),
      .icon :global(.Icon.Icon--homeFilled) {
        margin-top: -2px;
      }
    `}</style>
  </UnderlineButton>
);

export default NavButton;
