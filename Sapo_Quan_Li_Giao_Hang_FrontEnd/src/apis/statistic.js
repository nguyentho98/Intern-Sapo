import axiosService from '../utils/axoisService';

export const apifetchStatistic=() => {
    return axiosService.get(`http://localhost:8080/api/statistic`); 
 }
export const apifetchStatisticReport=() => {
    return axiosService.get(`http://localhost:8080/api/statistic/report`); 
 }