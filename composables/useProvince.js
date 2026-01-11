import { provinceService } from "~/services/provinceService";
export function useProvince (){
     const provinces = ref([]);
     const selectedProvince = ref("");
     const fetchProvince = async ()=>{
        provinces.value = (await provinceService.fetchProvinces()).data;
     };
     return {
        provinces,
        fetchProvince,
        selectedProvince
     }

}