export const DOTS_ACTIONS = {
  ADD: "ADD_DOT",
  REMOVE: "REMOVE_DOT",
  HOVER: "HOVER",
  CLEAR_HOVER: "CLEAR_HOVER",
};

export const dotsReducer = (dots, action) => {
  switch (action.type) {
    case DOTS_ACTIONS.ADD:
      return [...dots, action.dot];
    case DOTS_ACTIONS.REMOVE:
      return [
        ...dots.filter(
          (dot) => dot.string !== action.string || dot.fret !== action.fret
        ),
      ];
    case DOTS_ACTIONS.HOVER:
      return [
        ...dots.filter((dot) => !dot.moving),
        { ...action.dot, moving: true },
      ];
    case DOTS_ACTIONS.CLEAR_HOVER:
      return [...dots.filter((dot) => !dot.moving)];
    default:
      return dots;
  }
};
