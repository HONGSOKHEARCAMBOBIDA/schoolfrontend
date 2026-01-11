import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
import { provinceService } from "./provinceService";
import { districtService } from "./districtService";
import { communceService } from "./communceService";
import { villageService } from "./villageService";
import { disabilityservice } from "./Disabilityservice";
const API = API_URL;

export const studentService = {
  fetchStudents(params) {
    return axios.get(`${API}/viewstudent`, {
      headers: authHeaders(),
      params,
    });
  },
  async saveStudent(student){
    return axios.post(`${API}/student`,student,{
      headers: authHeaders()
    });
  },
  async fetchProvinces(){
    return provinceService.fetchProvinces();
  },
  async fetchDistricts(provinceId){
    return districtService.fetchDistrict(provinceId)
  },
  async fetchCommunces(districtId){
     return communceService.fetchcommunce(districtId)
  },
  async fetchVillages(communceId){
    return villageService.fetchVillage(communceId)
  },
  async fetchDisabilities(){
   return disabilityservice.fetchDisabilities();
  },
};
