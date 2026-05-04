import { useCookie } from '#app'

export function usePermission() {
  const permissions = useCookie<string[]>('permissions')

  const can = (permission: string): boolean => {
    if (!permissions.value) return false
    return permissions.value.includes(permission)
  }

  const canAny = (...perms: string[]): boolean => {
    return perms.some(p => can(p))
  }

  return { can, canAny }
}