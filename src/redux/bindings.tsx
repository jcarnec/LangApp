import { bindActionCreators } from "redux";
import { changeLearningAction, changeTranslateAction } from "./actions";

export const mapStateToProps = (state: any) => {
  const { settings } = state;
  return { settings };
};

export const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      changeLearning: changeLearningAction,
      changeTranslate: changeTranslateAction,
    },
    dispatch
  );