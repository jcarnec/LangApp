import { bindActionCreators } from "redux";
import { changeLearningAction, changeTranslateAction, changeShowHeader } from "./actions";

export const mapStateToProps = (state: any) => {
  return state
};

export const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      changeLearning: changeLearningAction,
      changeTranslate: changeTranslateAction,
      changeShowHeader: changeShowHeader,
    },
    dispatch
  );