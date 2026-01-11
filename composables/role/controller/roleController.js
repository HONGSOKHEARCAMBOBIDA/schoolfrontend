import roleService from "../service/roleService";
export default{
    async loadRoles(vm){
        vm.isLoading = true;
        try{
            const res = await roleService.fetchRoles();
            vm.roles = res.data;


        }catch(e){
            vm.toastMessage = "ទាញទិន្ន័យមិនបានទេ 🥵🥵";

        }finally{
            vm.isLoading = false
        }

    },
    async saveRole(vm){
        vm.errors = {};
        if(!vm.role.name.trim()){
            vm.errors.name = "សូមបញ្ចូលឈ្មោះតួនាទី";
            return;
        }
        vm.isLoading = true;
        try{
            if(vm.editingId){
                await roleService.updateRole(vm.editingId,vm.role);
                vm.toastMessage = "កែប្រែបានជោគជ័យ ✅";
            } else{
                await roleService.createRole(vm.role);
                vm.toastMessage = "បង្កើតបានជោគជ័យ ✅";

            }
            vm.role.name = "";
            vm.editingId = null;
            this.loadRoles(vm);
            const toastEl = document.getElementById("successToast");
      const toast = new bootstrap.Toast(toastEl, {
        delay: 3000,
        autohide: true,
      });
      toast.show();


        }catch(e){
            console.error(e);

        }finally{
            vm.isLoading = false;
        }
    },
    editRole(vm,r){
        vm.role.name = r.name;
        vm.editingId = r.id;
    },
    // vm is where you put data
    // r is data that you put
    cancelEdit(vm){
        vm.role.name = "";
        vm.editingId = null;
        vm.errors = {};
    },
    async toggoleStatus(vm,r){
        try {
            await roleService.toggleStatus(r.id,r.is_active);
            // this.loadRoles(vm);

        }catch(e){
            console.error(e);

        }
    }
}