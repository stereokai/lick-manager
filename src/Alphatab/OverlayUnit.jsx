const OverlayUnit = ({ bounds, isVisible }) => {
  // const [style, setStyle] = useState();
  // useEffect(() => {
  //   setStyle(() => {
  //     if (!bounds) return;

  //     return {

  //     };
  //   });
  // }, [bounds]);

  const style = {
    top: `${bounds.y}px`,
    left: `calc(${bounds.x}px - 0.125rem`,
    width: `calc(${bounds.w}px + 0.25rem`,
    height: `${bounds.h}px`,
  };

  return (
    <div
      // ref={overlayUnitRef}
      style={style}
      className={`absolute ${
        isVisible ? "border-solid border-1 border-orange-500 bg-orange-300" : ""
      }`}
    />
  );
};

export default OverlayUnit;
