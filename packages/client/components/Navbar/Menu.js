import React from 'react';
import Link from 'next/link';
import { logout } from '../../lib/auth';
import Avatar from 'components/Avatar';
import Dropdown, { Option as DropdownOption } from 'components/Dropdown';

const Menu = ({ loggedInUser }) => {
  const handleLogout = () => {
    logout({ withRefresh: true });
  };

  const DropdownButton = (
    <button>
      <Avatar size={'small'} />
    </button>
  );

  return (
    <div className="menu">
      <Dropdown triggerButton={DropdownButton}>
        <DropdownOption>
          <Link
            href={`/profile?username=${loggedInUser.username}`}
            as={`/profile/${loggedInUser.username}`}
            prefetch
          >
            <a className="user-header">
              <p className="name">{loggedInUser.name}</p>
              <p className="username">@{loggedInUser.username}</p>
            </a>
          </Link>
        </DropdownOption>
        <DropdownOption divider />
        <DropdownOption icon="me" text="Profile" />
        <DropdownOption icon="list" text="Lists" />
        <DropdownOption icon="lightning" text="Moments" />
        <DropdownOption divider />
        <DropdownOption text="Log out" onClick={handleLogout} />
      </Dropdown>

      <style jsx>{`
        .menu > :global(div) {
          position: relative;
          display: flex;
          align-items: center;
        }

        .menu :global(button) {
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          border-radius: 50%;
        }

        button:focus {
          box-shadow: 0 0 0 2px #ffffff, 0 0 2px 4px rgba(27, 149, 224, 0.4);
        }

        .user-header {
          display: block;
          padding: 0 16px 8px;
        }

        .name {
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.1em;
          line-height: 1.1em;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .username {
          color: rgba(0, 0, 0, 0.5);
          line-height: 1em;
          font-size: 0.8em;
        }
      `}</style>
    </div>
  );
};

export default Menu;
