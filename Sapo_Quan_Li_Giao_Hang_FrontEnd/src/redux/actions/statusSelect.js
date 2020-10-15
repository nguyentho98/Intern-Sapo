import * as types from '../constants/statistic';
export const fetchStatistic = () => {
    return {
        type: types.FETCH_STATISTIC,
        payload: {},
    };
};
export const fetchStatisticSuccess = (data) => {
    return {
        type: types.FETCH_STATISTIC_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchStatisticFailed = (error) => {
    return {
        type: types.FETCH_STATISTIC_FAILED,
        payload: {
            error,
        },
    };
};
