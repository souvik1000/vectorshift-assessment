import clsx from "clsx";

import Styles from "./node.module.scss";

export const NodeContainer = ({ children, className, width = 200, height, bgColor = '#fff' }) => {
    return (
      <div
        className={clsx(Styles.nodeContainer, className)}
        style={{ width, height, backgroundColor: bgColor }}
      >
        {children}
      </div>
    );
};
