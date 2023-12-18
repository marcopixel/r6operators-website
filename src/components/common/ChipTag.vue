<template>
  <button :class="['chiptag', props.close ? 'close' : '']" @click="emit('click')">
    <component :is="props.icon" v-if="props.icon" class="chiptag-icon" />
    <span class="chiptag-label">{{ props.label }}</span>
    <component :is="props.closeIcon" v-if="props.close" class="chiptag-close" />
  </button>
</template>

<script setup lang="ts">
import IconClose from "@assets/icons/close.svg?component"
import { FunctionalComponent } from "vue"

interface Props {
  label: string
  icon?: FunctionalComponent
  close?: boolean
  closeIcon?: FunctionalComponent
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  close: false,
  closeIcon: IconClose,
})

// declare emits
const emit = defineEmits<{
  (event: "click"): void
}>()
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "sass:color";
@use "styles/variables";
@use "styles/colors";

.chiptag {
  display: flex;
  align-items: center;
  justify-content: center;
  color: colors.$white;
  background: color.adjust(colors.$body-bg, $lightness: 10%);
  border: 1px solid color.adjust(colors.$body-bg, $lightness: 15%);
  border-radius: 8px;
  white-space: nowrap;
  padding: 0 1rem;
  height: 2rem;
  font-size: 0.8em;
  font-weight: map.get(variables.$fontweights, "bold");
  transition: all 0.2s;
  position: relative;
  cursor: pointer;

  .chiptag-close {
    width: 1rem;
    position: absolute;
    right: 0.5rem;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &.close {
    padding-right: 2rem;

    .chiptag-close {
      opacity: 1;
    }
  }

  .chiptag-label {
    color: inherit;
  }

  &.active {
    max-width: 100%;
  }

  &:focus-visible {
    outline: none;
  }
}
</style>
