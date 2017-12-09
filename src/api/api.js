import axios from 'axios'
import Qs from 'qs'

axios.defaults.baseURL = 'http://101.200.133.230/collect_statistics/external/v1';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  /**
   * 查询总计信息
   * @returns {*}
   */
    getTotalInfo(){
      return axios.get('/query_total_info')
    },
  /**
   * 查询区域列表
   * @returns {*}
   */
    getAreaList(){
      return axios.get('/query_area_list')
    },
  /**
   * 查询区域信息
   * @param id 区域id
   * @returns {AxiosPromise|*}
     */
    getAreaInfo(data){
      return axios.post('/query_area_info',Qs.stringify(data));
    },
  /**
   * 查询地区信息
   * @param areaId 区域id
   * @param fieldId 地区id
   * @returns {AxiosPromise|*}
     */
    getFieldInfo(areaId,fieldId){
      return axios.post('/query_field_info',Qs.stringify({area_id:areaId,field_id:fieldId}));
    },
    getLastCollectInfo(areaId,fieldId,deviceId){
      return axios.post('/query_last_collect_info',Qs.stringify({area_id:areaId,field_id:fieldId,device_id:deviceId}))
    }
}
