import {combineReducers} from "redux"

import  template, {asyncActions as temp_asyncActions} from "./slices/temp"

export default combineReducers({
	temp:  template.reducer,
})

export const template_actions = {
	temp:  template.actions,
}

export const template_asyncActions = {
	temp:  temp_asyncActions,
}
