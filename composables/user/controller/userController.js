// import userService from "../service/userService";
import userservice from "../service/userservice";
// import roleService from "../service/roleService";
// // import roleService from "~/composables/role/service/roleService";
import { roleService } from "~/services/roleService";

export default {
  async loadUsers(vm) {
    vm.isLoading = true;
    try {
      const res = await userservice.fetchUsers(vm.filters);
      vm.users = res.data;
    } catch (err) {
      console.error(err);
      vm.toastMessage = "ទាញទិន្ន័យអ្នកប្រើប្រាស់មិនបានទេ 🥵";
      const toastEl = document.getElementById("successToast");
      const toast = new bootstrap.Toast(toastEl, { delay: 3000, autohide: true });
      toast.show();
    } finally {
      vm.isLoading = false;
    }
  },

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

  async toggleUserStatus(vm, user) {
    try {
      await userservice.toggleUserStatus(user.id, user.is_active);
      this.loadUsers(vm);
    } catch (err) {
      console.error(err);
    }
  },

  async loadTeacherSubjects(vm, userId) {
    vm.isLoadingDetail = true;
    try {
      const res = await userservice.fetchTeacherSubjects(userId);
      vm.teacherSubjects = res.data;
      const modal = new bootstrap.Modal(document.getElementById("teacherDetailModal"));
      modal.show();
    } catch (err) {
      console.error(err);
      vm.teacherSubjects = [];
    } finally {
      vm.isLoadingDetail = false;
    }
  },
};
