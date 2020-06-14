import { Dropdown, Icon, Button } from "semantic-ui-react";
import css from "./userdropdown.css";
import Link from "next/link";

export const DropdownInitial = () => {
  return (
    <Dropdown className={css.dropdown} icon="user" direction="left">
      <Dropdown.Menu className={css.menu}>
        <Link href="/signin">
          <button className={css.button}>Sing-In to your account</button>
        </Link>
        <div className={css.accountsign}>
          New here? Please{" "}
          <Link href="/signup">
            <a>Create your account</a>
          </Link>
        </div>
        <Dropdown.Divider />
        <Dropdown.Item text="Your Orders" />
        <Dropdown.Item text="Your Account" />
        <Dropdown.Item text="Your Wallet" />
        <Dropdown.Item text="Pet Store" icon="paw" />
        <Dropdown.Item icon="folder" text="Move to folder" />
        <Dropdown.Item icon="trash" text="Move to trash" />
        <Dropdown.Divider />
        <Dropdown.Item icon="call" text="Customer Support" />
        <Dropdown.Item text="Publish To Web" />
        <Dropdown.Item text="E-mail Collaborators" />
        <Dropdown.Divider direction="left" />
      </Dropdown.Menu>
    </Dropdown>
  );
};
