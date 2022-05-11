import {CATEGORY_GET_CATEGORY} from "configs/variables.config";


const initialState ={
    category : []
}

export const categoryReducer = (state = initialState , action)=>{
    switch (action.type){
        case (CATEGORY_GET_CATEGORY):
            return {...state , category : action.payload}
        default :
            return state
    }
}