// composables/useRole.js
import { ref } from 'vue';
import { roleService } from '~/services/roleService';

export function useRole() {
  // Reactive state
  const roles = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fetch all roles
  const fetchRoles = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await roleService.fetchRoles();
      roles.value = response.data;
    } catch (err) {
      error.value = err;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Create a new role
  const createRole = async (role) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await roleService.createRole(role);
     
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update a role
  const updateRole = async (id, role) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await roleService.updateRole(id, role);
      // update the role in the list
      const index = roles.value.findIndex(r => r.id === id);
      if (index !== -1) roles.value[index] = response.data;
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Toggle role status
  const toggleStatus = async (role) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await roleService.toggleStatus(role.id);
      // update the role in the list
      const index = roles.value.findIndex(r => r.id === role.id);
      if (index !== -1) roles.value[index] = response.data;
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    toggleStatus
  };
}
