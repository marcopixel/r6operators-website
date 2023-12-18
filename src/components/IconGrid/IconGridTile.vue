<template>
  <div class="icongrid-tile" @click="toggleModal">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="icongrid-tile-icon">
      <img :src="imageURL" :alt="`${props.operator.name} icon`" width="180" height="180" />
    </div>
    <h2 class="icongrid-tile-name">{{ props.operator.name }}</h2>

    <Teleport to="body">
      <Transition name="fade" @before-enter="beforeEnter" @after-leave="afterLeave">
        <div v-if="isModalOpen" class="icongrid-tile-modal">
          <div class="icongrid-tile-modal-backdrop" @click="toggleModal"></div>
          <div class="container">
            <button class="icongrid-tile-modal-close" @click="toggleModal"><CloseIcon />Close</button>
            <div class="icongrid-tile-modal-inner">
              <div class="icongrid-tile-modal-preview">
                <div class="icongrid-tile-modal-preview-icon">
                  <img :src="imageURL" :alt="`${props.operator.name} icon`" width="180" height="180" />
                </div>
              </div>
              <div class="icongrid-tile-modal-data">
                <h2 class="icongrid-tile-modal-data-title">{{ props.operator.name }}</h2>
                <div class="icongrid-tile-modal-data-download">
                  <DownloadIcon />
                  <a :href="`/icons/png/${props.operator.id}.png`" download>PNG</a>
                  <a :href="`/icons/svg/${props.operator.id}.svg`" download>SVG</a>
                  <a :href="`/icons/zip/${props.operator.id}.zip`" download>ZIP</a>
                </div>
                <hr />
                <div class="icongrid-tile-modal-data-tags">
                  <div>
                    <span>Role: </span>
                    <ChipTag class="role" :label="props.operator.role" />
                  </div>
                  <div>
                    <span>Organisation:</span>
                    <ChipTag class="organisation" :label="props.operator.org" />
                  </div>
                  <div>
                    <span>Squad:</span>
                    <ChipTag class="squad" :label="props.operator.squad" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script async setup lang="ts">
import { ref } from "vue"
import { Operator } from "r6operators"
import ChipTag from "@components/common/ChipTag.vue"
import CloseIcon from "@assets/icons/close.svg?component"
import DownloadIcon from "@assets/icons/download.svg?component"

// define props
const props = defineProps<{
  operator: Operator
}>()

// image url
const imageURL = `./icons/svg/${props.operator.id}.svg`

// handle opening and closing the modal
const isModalOpen = ref(false)
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

// handle body overflow
const beforeEnter = () => {
  const vertScrollWidth = window.innerWidth - document.body.clientWidth
  if (vertScrollWidth) {
    document.body.style.marginRight = vertScrollWidth + "px"
  }
  document.body.style.overflow = "hidden"
}
const afterLeave = () => {
  document.body.style.overflow = "auto"
  document.body.style.marginRight = ""
}
</script>

<style lang="scss">
@use "sass:map";
@use "sass:color";
@use "styles/variables" as *;
@use "styles/mixins";
@use "styles/colors";

.icongrid-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: $border-radius;
  border: 1px solid color.adjust(colors.$body-bg, $lightness: 7%);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: color.mix(colors.$white, colors.$body-bg, 5%);
    border: 1px solid color.adjust(colors.$body-bg, $lightness: 15%);
  }

  .icongrid-tile-icon {
    position: relative;
    display: flex;
    width: 90%;
    height: auto;
    margin: 0 auto;
    transition: all 0.3s ease;

    &::before {
      content: "";
      width: 100%;
      padding-bottom: 100%;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .icongrid-tile-name {
    padding: 0 1rem 1rem;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-grow: 1;
  }

  .icongrid-tile-downloads {
    position: absolute;
    top: 0;
    display: none;
  }
}

.icongrid-tile-modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  overflow: hidden;

  .icongrid-tile-modal-backdrop {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0 0 0 / 80%);
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  > .container {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    pointer-events: none;
  }

  .icongrid-tile-modal-close {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    color: colors.$white;
    padding: 0.5rem 1.5rem;
    margin-bottom: 0.5rem;
    flex-shrink: 0;
    transition: all 0.3s ease;
    transform-origin: center;
    opacity: 0.6;
    pointer-events: initial;
    cursor: pointer;

    svg {
      width: 1.5em;
      height: 1.5em;
      flex-shrink: 0;
      margin-right: 1em;
    }

    &:hover,
    &:focus {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  .icongrid-tile-modal-inner {
    display: flex;
    flex-direction: column;
    color: colors.$white;
    background-color: color.adjust(colors.$body-bg, $lightness: 5%);
    border: 1px solid color.adjust(colors.$body-bg, $lightness: 10%);
    border-radius: $border-radius;
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    max-width: 30rem;
    flex-shrink: 1;
    margin-bottom: 1rem;
    overflow-y: auto;
    pointer-events: initial;
  }

  .icongrid-tile-modal-preview {
    position: relative;
    display: flex;
    width: 100%;
    padding: 1rem;
    background-color: color.mix(colors.$black, colors.$body-bg, 5%);

    .icongrid-tile-modal-preview-icon {
      position: relative;
      display: flex;
      width: 50%;
      max-width: 10rem;
      height: auto;
      margin: 0 auto;
      transition: all 0.3s ease;

      &::before {
        content: "";
        width: 100%;
        padding-bottom: 100%;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit: contain;
      }

      @include mixins.breakpoint("lg") {
        width: 60%;
        max-width: 20rem;
      }
    }
  }

  .icongrid-tile-modal-data {
    padding: 2rem;

    hr {
      margin: 1.5rem 0;
      opacity: 0.1;
    }

    .icongrid-tile-modal-data-title {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .icongrid-tile-modal-data-download {
      display: flex;
      justify-content: space-between;
      font-size: 0.875em;

      > svg {
        width: 1.5rem;
        height: 1.5rem;
        object-fit: contain;
        object-position: center;
        margin-right: auto;
      }

      a {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        text-transform: uppercase;
        text-decoration: none;
        color: colors.$white;
        font-weight: map.get($fontweights, "bold");

        &:first-child {
          margin-left: 1rem;
        }

        &:last-child {
          margin-right: 0;
        }

        &:hover,
        &:focus {
          color: rgba(colors.$white, 0.6);
        }
      }
    }

    .icongrid-tile-modal-data-tags {
      display: flex;
      flex-direction: column;

      > div {
        display: flex;
        align-items: center;
        margin-top: 0;
        margin-bottom: 0.5rem;

        > span {
          flex-grow: 1;
        }
      }

      .chiptag {
        margin-left: 1rem;

        &.role {
          background: rgba(colors.$tag-role, 0.2);
          border-color: rgba(colors.$tag-role, 0.8);
        }

        &.organisation {
          background: rgba(colors.$tag-org, 0.2);
          border-color: rgba(colors.$tag-org, 0.8);
        }

        &.squad {
          background: rgba(colors.$tag-squad, 0.2);
          border-color: rgba(colors.$tag-squad, 0.8);
        }
      }
    }
  }
}
</style>
