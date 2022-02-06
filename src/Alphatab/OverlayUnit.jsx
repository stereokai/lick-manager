const OverlayUnit = ({ bounds, click, isVisible }) => {
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
      className={`absolute cursor-pointer ${
        isVisible()
          ? "border-solid border-1 border-orange-500 bg-orange-300"
          : ""
      }`}
      onClick={() => click()}
    />
  );
};

export default OverlayUnit;
