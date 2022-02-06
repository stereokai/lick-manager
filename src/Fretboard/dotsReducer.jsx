export const DotsActions = {
  ADD: "ADD_DOT",
  REMOVE: "REMOVE_DOT",
  HOVER: "HOVER",
  CLEAR_HOVER: "CLEAR_HOVER",
};

export const dotsReducer = (dots, action) => {
  switch (action.type) {
    case DotsActions.ADD:
      return [...dots, action.dot];
    case DotsActions.REMOVE:
      return [
        ...dots.filter(
          (dot) => dot.string !== action.string || dot.fret !== action.fret
        ),
      ];
    case DotsActions.HOVER:
      return [
        ...dots.filter((dot) => !dot.moving),
        { ...action.dot, moving: true },
      ];
    case DotsActions.CLEAR_HOVER:
      return [...dots.filter((dot) => !dot.moving)];
    default:
      return dots;
  }
};
