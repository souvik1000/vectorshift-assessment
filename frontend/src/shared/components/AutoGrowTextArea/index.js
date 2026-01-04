import { useAutoResize } from "../../hooks/useAutoResize.ts";

const AutoGrowTextarea = ({ value, clasName, onChange, ...props }) => {
  const ref = useAutoResize(value);

  return (
    <textarea
      rows={1}
      ref={ref}
      value={value}
      onChange={onChange}
      className={clasName}
      style={{ overflow: 'hidden', resize: 'none', width: '100%' }}
      {...props}
    />
  );
};

export default AutoGrowTextarea;
