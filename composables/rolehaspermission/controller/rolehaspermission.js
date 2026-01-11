import { ref } from "vue";
import { rolehaspermissionservice } from "../service/rolehaspermission";
import { useAlert } from "#imports";
export function useRolePermission(roleId){
     const { showAlert } = useAlert();
    const permissions = ref([]);
    const loading = ref(false);
    const changedPermissions = ref([]);
    const fetchPermissions = async ()=>{
        loading.value = true;
        try 
        {
            permissions.value = await rolehaspermissionservice.fetchPermission(roleId)

        }catch(e){
            console.log(e)

        }finally{
            loading.value = false;
        }
    };
   const togglePermission = (p, event) => {
  const newValue = event.target.checked;
  const index = changedPermissions.value.findIndex(cp => cp.id === p.id);

  if (index === -1) {
    // add new change
    changedPermissions.value.push({ ...p, assigned: newValue });
  } else {
    // update existing change
    changedPermissions.value[index].assigned = newValue;
  }
};

     const savePermissions = async () => {
    const toAdd = changedPermissions.value
      .filter(p => p.assigned)
      .map(p => p.id);
    if (!toAdd.length) return showAlert("សូមជ្រើស Permission មួយចំនួន", "warning");

    await rolehaspermissionservice.addPermissions(roleId, toAdd);
    changedPermissions.value = [];
    fetchPermissions();
    showAlert("បានរក្សាទុកសិទ្ធិដោយជោគជ័យ", "success");
  };

  const removePermissions = async () => {
    const toRemove = changedPermissions.value
      .filter(p => !p.assigned)
      .map(p => p.id);
    if (!toRemove.length) return alert("សូមជ្រើស Permission មួយចំនួនដើម្បីដក");

    await rolehaspermissionservice.removePermissions(roleId, toRemove);
    changedPermissions.value = [];
    fetchPermissions();
  };

  return {
    permissions,
    loading,
    fetchPermissions,
    togglePermission,
    savePermissions,
    removePermissions,
  };

}