var initialState = {
    value: ''
}

var myReducer = (state = initialState, action) => {
    if (action.type === "PAGE_NUMBER") {
        var value = action.pagenumber;
        return {
            pagenumber:value           
        }
    }

};
export default myReducer