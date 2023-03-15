import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DropdownMenu.module.css";
import { TbGridDots } from "react-icons/tb";

const DropdownSelect = React.forwardRef(({ onClick }, ref) => (
  <i
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <TbGridDots className={styles.DropdownItem} />
  </i>
));

export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="mr-auto" drop="right">
      <Dropdown.Toggle as={DropdownSelect} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="remove post"
        >
          <i class="fas fa-eraser" ></i>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit or change post"
        >
          <i class="fas fa-cogs"></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
