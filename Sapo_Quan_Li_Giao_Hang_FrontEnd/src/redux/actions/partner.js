export const listIdState = (id,state) => {
    return {
        type: 'FETCH_PARTNER',
        id,
        state
    };
};
