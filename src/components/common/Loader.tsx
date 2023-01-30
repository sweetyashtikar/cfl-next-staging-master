interface ILoader {
  width?: number;
  height?: number;
  color?: string;
}

const Loader = (props: ILoader) => {
  const { width = 8, height = 8, color = 'blue' } = props;

  return (
    <div
      className={`h-${height} w-${width} animate-spin rounded-full border-t-2 border-b-2 border-${color}-600`}
    />
  );
};

export default Loader;
