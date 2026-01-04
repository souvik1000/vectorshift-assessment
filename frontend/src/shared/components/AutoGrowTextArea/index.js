import clsx from "clsx";

import { useAutoResize } from "../../hooks/useAutoResize.ts";

import Styles from "./autoGrowTextArea.module.scss";

const AutoGrowTextarea = ({ value, clasName, onChange, ...props }) => {
  const ref = useAutoResize(value);

  return (
    <textarea
      rows={1}
      ref={ref}
      value={value}
      onChange={onChange}
      className={clsx(clasName, Styles.autoTextArea)}
      {...props}
    />
  );
};

export default AutoGrowTextarea;
