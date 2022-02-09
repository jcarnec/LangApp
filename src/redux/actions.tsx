
import { CHANGE_LEARNING, CHANGE_TRANSLATE, TOGGLE_ON_INTEREST_SCREEN as CHANGE_SHOW_HEADER } from "./constants";

export const changeLearningAction = (changeLearning: any) => ({
  type: CHANGE_LEARNING,
  payload: changeLearning,
})

export const changeTranslateAction = (changeTranslate: any) => ({
  type: CHANGE_TRANSLATE,
  payload: changeTranslate,
})


export const changeShowHeader = (showHeader: any) => ({
  type: CHANGE_SHOW_HEADER,
  payload: showHeader,
})



