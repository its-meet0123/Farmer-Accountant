import { Drawer } from "antd";

const MenuDrawer = ({ title, placement, open, setOpen, onClose, children }) => {
  return (
    <>
      <Drawer title={title} placement={placement} open={open} onClose={onClose}>
        {children}
      </Drawer>
    </>
  );
};

export default MenuDrawer;
