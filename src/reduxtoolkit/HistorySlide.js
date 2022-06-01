import { createSlice } from "@reduxjs/toolkit";



const history = createSlice({
    name: 'history',
    initialState: {
        history: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")):[],
    },
    reducers:{
        
        addToHistory: (state, action)=>{ 
            const itemIndex = state.history.findIndex((item)=>item.id === action.payload.id);
            if(itemIndex >= 0){
                state.history[itemIndex].cartQuantity += 0;
            }
            else{
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.history.push(tempProduct);
            }
            localStorage.setItem("cartItem",JSON.stringify(state.history));  //localStorage
        },

        removeHistory :(state, action)=>{ 
            state.history = [];
            localStorage.setItem("cartItem",JSON.stringify(state.history));  //localStorage


        }
    },
})




const {reducer , actions} = history;
export const {addToHistory,removeHistory} = actions;
export default reducer;