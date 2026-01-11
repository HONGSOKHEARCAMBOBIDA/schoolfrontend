import { classService } from "~/services/classService";
export function useclass(){
    const classes = ref([]);
    const fetchClasses = async () => {
    try{
      const res = await classService.fetchClasses();
    classes.value = res.data;

    }catch(e){
      console.log("Error")
      console.log(e)

    }
    
  };
  return {
    classes,
    fetchClasses
  };
}