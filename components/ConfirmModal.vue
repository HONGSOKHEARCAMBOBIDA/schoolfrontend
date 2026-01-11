<template>
  <div class="modal fade" tabindex="-1" :class="{ show: show }" style="display: block;" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">បោះបង់</button>
          <button type="button" class="btn btn-danger" @click="$emit('confirm')">លុប</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: { type: String, default: 'បញ្ជាក់ការលុប' },
  message: { type: String, default: 'តើអ្នកប្រាកដចង់លុបមែនទេ?' }
})
</script>
