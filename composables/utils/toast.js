// utils/toast.js
import { useToast } from '#imports'

export function showSuccess(message, title = 'ជោគជ័យ!') {
  useToast().success({ title, message })
}

export function showError(message, title = 'ខុសប្រក្រតី!') {
  useToast().error({ title, message })
}
