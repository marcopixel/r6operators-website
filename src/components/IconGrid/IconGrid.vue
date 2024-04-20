<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { Operator, default as ops } from "r6operators"
import { Collapse } from "vue-collapsed"
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from "radix-vue"
import slugify from "slugify"
import SearchIcon from "@assets/icons/search.svg?component"
import CloseIcon from "@assets/icons/close.svg?component"
import SortIcon from "@assets/icons/sort.svg?component"
import IconGridTile from "./IconGridTile.vue"
import Multiselect from "@vueform/multiselect"
import ChipTag from "@components/common/ChipTag.vue"

// type for filter item
type filterItem = {
  value: string
  type: string
  label: string
}
type sortValue = "a-z" | "z-a" | "newest" | "oldest"
type sortItem = {
  value: sortValue
  label: string
}

// prepare operator data + filters
const operators = Object.values(ops)
const roles = [...new Set(operators.map((x) => x.role))]
const orgs = [...new Set(operators.map((x) => x.org))]
const squads = [...new Set(operators.map((x) => x.squad))]

// prepare select option object
const selectOptions = [
  {
    label: "Role",
    options: roles.sort().map((x) => {
      return { value: x, type: "Role", label: x }
    }),
  },
  {
    label: "Organisation",
    options: orgs.sort().map((x) => {
      return { value: x, type: "Organisation", label: x }
    }),
  },
  {
    label: "Squad",
    options: squads.sort().map((x) => {
      return { value: x, type: "Squad", label: x }
    }),
  },
]

const sortOptions = [
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
] as sortItem[]
const defaultSorter = "a-z"

// create refs for inputs
const filterText = ref("")
const filterSelect = ref<filterItem[]>([])
const sortSelect = ref<sortItem>(sortOptions.find((x) => x.value === defaultSorter) as sortItem)
const multiselect = ref()

// sort filter select options by type (first by role, then by org, then by squad)
watch(filterSelect, (val) => {
  filterSelect.value = val.sort((a, b) => {
    if (a.type === b.type) return 0
    if (a.type === "Role") return -1
    if (a.type === "Organisation" && b.type === "Squad") return -1
    if (a.type === "Squad" && b.type === "Organisation") return 1
    if (a.type === "Organisation" && b.type === "Role") return 1
    if (a.type === "Squad" && b.type === "Role") return 1
    return 0 // Default case when none of the conditions match
  })
})

// clear filter functions
function clearFilters(type: "all" | "text" | "tags") {
  switch (type) {
    case "all":
      filterText.value = ""
      filterSelect.value = []
      break
    case "text":
      filterText.value = ""
      break
    case "tags":
      filterSelect.value = []
      break
  }
}
const clearFilterItem = (tag: filterItem) => {
  multiselect.value.deselect({ value: tag.value })
}

const getSeasonId = (shorthand: string) => {
  if (shorthand === "Release") return 0

  const [year, season] = /Y(\d+)S(\d)/.exec(shorthand)?.slice(1).map(Number) as [number, number]
  return year === 0 ? 0 : year * 4 - 4 + season
}

const sortOperators = (operators: Operator[], sorter: sortValue) => {
  let operatorsCopy = [...operators]
  switch (sorter) {
    case "a-z":
      return operatorsCopy.sort((a, b) => a.id.localeCompare(b.id))
    case "z-a":
      return operatorsCopy.sort((a, b) => b.id.localeCompare(a.id))
    case "newest":
      return operatorsCopy
        .sort((a, b) => a.role.localeCompare(b.role)) // Role
        .sort((a, b) => a.org.localeCompare(b.org)) // Org
        .sort((a, b) => {
          return (b.meta ? getSeasonId(b.meta.season) : -1) - (a.meta ? getSeasonId(a.meta.season) : -1)
        }) // Season
    case "oldest":
      return operatorsCopy
        .sort((a, b) => a.role.localeCompare(b.role)) // Role
        .sort((a, b) => a.org.localeCompare(b.org)) // Org
        .sort((a, b) => {
          return (a.meta ? getSeasonId(a.meta.season) : -1) - (b.meta ? getSeasonId(b.meta.season) : -1)
        })
    default:
      return operatorsCopy
  }
}

// create computed list of operators
const sortedOperators = computed(() => {
  return sortOperators(operators, (sortSelect.value?.value ?? defaultSorter) as sortValue)
})

// create filtered list
const filteredItems = computed(() => {
  // set filter object
  let filters = {
    name: filterText.value,
    role: filterSelect.value.filter((op) => op.type === "Role").map((x) => x.value),
    org: filterSelect.value.filter((op) => op.type === "Organisation").map((x) => x.value),
    squad: filterSelect.value.filter((op) => op.type === "Squad").map((x) => x.value),
  }

  // if filters are empty, return original list
  if (!filters.name && filters.role.length === 0 && filters.org.length === 0 && filters.squad.length === 0) return sortedOperators.value

  // filter operators for name, role and unit
  return sortedOperators.value
    .filter((op) => (filters.name ? op.name.toLowerCase().includes(filters.name.toLowerCase()) : true))
    .filter((op) => (filters.role.length > 0 ? filters.role.includes(op.role) : true))
    .filter((op) => (filters.org.length > 0 ? filters.org.includes(op.org) : true))
    .filter((op) => (filters.squad.length > 0 ? filters.squad.includes(op.squad) : true))
})
</script>

<template>
  <div class="icongrid">
    <div class="icongrid-searchbar">
      <div class="icongrid-search">
        <div class="icongrid-search-icon">
          <SearchIcon />
        </div>
        <input v-model="filterText" class="icongrid-search-input" :placeholder="`Search ${filteredItems.length} operators`" />
        <Transition name="slide-fade-left">
          <button v-if="filterText" class="icongrid-search-clear" @click="clearFilters('text')">
            <CloseIcon />
          </button>
        </Transition>
      </div>
      <div class="icongrid-select">
        <Multiselect
          ref="multiselect"
          v-model="filterSelect"
          mode="multiple"
          :object="true"
          :groups="true"
          :group-select="false"
          :options="selectOptions"
          :can-deselect="true"
          :can-clear="false"
          placeholder="Add filters..."
        />
      </div>
      <div class="icongrid-sort">
        <PopoverRoot>
          <PopoverTrigger>
            <SortIcon />
          </PopoverTrigger>
          <PopoverPortal>
            <Transition name="fade">
              <PopoverContent class="icongrid-sort-popover">
                <div class="icongrid-sort-popover-options">
                  <button
                    v-for="sort in sortOptions"
                    :key="sort.value"
                    :class="['icongrid-sort-popover-option', sortSelect?.value === sort.value ? 'active' : '']"
                    @click="sortSelect = sort"
                  >
                    {{ sort.label }}
                  </button>
                </div>
              </PopoverContent>
            </Transition>
          </PopoverPortal>
        </PopoverRoot>
      </div>
    </div>

    <Collapse :when="filterSelect.length > 0">
      <div class="icongrid-search-tags">
        <TransitionGroup name="fade">
          <ChipTag
            v-for="filter in filterSelect"
            :key="filter.value"
            :label="filter.label.toString()"
            :close="true"
            :class="['icongrid-search-tag', filter.type.toLowerCase(), slugify(filter.value, { lower: true })]"
            @click="clearFilterItem(filter)"
          />
        </TransitionGroup>
      </div>
    </Collapse>

    <div class="icongrid-items">
      <IconGridTile v-for="op in filteredItems" :key="op.id" :operator="op" />
      <TransitionGroup name="fade">
        <div v-if="filteredItems.length === 0" class="icongrid-items-empty">
          <p>No operators found</p>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
@use "sass:map";
@use "sass:color";
@use "styles/variables" as *;
@use "styles/mixins";
@use "styles/colors";

.icongrid {
  position: relative;

  .icongrid-searchbar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .icongrid-search {
    width: 100%;
    position: relative;
    display: flex;
    height: 3.5rem;
    flex-grow: 1;
    color: colors.$white;
    background-color: color.mix(colors.$white, colors.$body-bg, 7%);
    border: 1px solid color.mix(colors.$white, colors.$body-bg, 15%);
    border-radius: $border-radius;
    overflow: hidden;

    // box-shadow:
    //   rgba(colors.$black, 0.02) 0 6px 24px 0,
    //   rgba(colors.$black, 0.04) 0 0 0 1px;
    transition: all 0.3s ease;

    &:hover {
      border: 1px solid rgba(colors.$white, 0.2);
      background-color: color.mix(colors.$white, colors.$body-bg, 10%);
      box-shadow: 0 0 20px 2px rgba(colors.$white, 0.05);
    }

    &:focus-within {
      border: 1px solid rgba(colors.$white, 0.4);
      box-shadow: 0 0 20px 2px rgba(colors.$white, 0.05);
    }

    .icongrid-search-icon {
      display: flex;
      place-items: center center;
      height: 100%;
      width: auto;
      padding-left: 1rem;

      svg {
        height: 1.25rem;
        width: 1.25rem;
      }
    }

    .icongrid-search-input {
      width: 100%;
      padding: 1rem 1.5rem 1rem 1rem;
      border: 0;
      color: colors.$white;
      background-color: transparent;
      box-shadow: none;

      &::placeholder {
        color: rgba(colors.$white, 0.6);
      }

      &:focus {
        border: none;
        outline: none;
      }
    }

    .icongrid-search-clear {
      position: absolute;
      top: 0;
      right: 0;
      width: 3.5rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border-radius: $border-radius;
      border: 0;
      transition: all 0.3s ease;

      svg {
        width: 1.5rem;
        height: 1.5rem;
        transition: all 0.3s ease;
      }

      &:focus {
        border: 0;
        outline: none;
        background-color: rgba(colors.$white, 0.1);
      }

      &:hover {
        svg {
          transform: scale(1.1);
        }
      }
    }
  }

  .icongrid-select {
    flex-grow: 1;

    .multiselect {
      width: 100%;
      color: colors.$white;
      height: 3.5rem;
      border-radius: $border-radius;
      background-color: color.mix(colors.$white, colors.$body-bg, 7%);
      border: 1px solid color.mix(colors.$white, colors.$body-bg, 15%);
      transition-property: border, box-shadow, background-color;
      transition-duration: 0.3s;
      transition-timing-function: ease;

      &.is-open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      &.is-active {
        box-shadow: none;
      }

      &:hover {
        border: 1px solid rgba(colors.$white, 0.2);
        background-color: color.mix(colors.$white, colors.$body-bg, 10%);
        box-shadow: 0 0 20px 2px rgba(colors.$white, 0.05);
      }

      &:focus-within {
        border: 1px solid rgba(colors.$white, 0.4);
        box-shadow: 0 0 20px 2px rgba(colors.$white, 0.05);
      }

      .multiselect-multiple-label,
      .multiselect-single-label,
      .multiselect-placeholder {
        color: rgba(colors.$white, 0.6);
        padding-left: 1.5rem;
      }

      .multiselect-dropdown {
        border-radius: $border-radius;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background-color: color.mix(colors.$white, colors.$body-bg, 7%);
        border: 1px solid color.mix(colors.$white, colors.$body-bg, 15%);
        max-height: 15rem;
      }

      .multiselect-group-label {
        padding: 0.5rem 1rem;
        color: colors.$white;
        font-weight: map.get($fontweights, "bold");
        background-color: color.mix(colors.$white, colors.$body-bg, 12%);
      }

      .multiselect-option {
        transition: all 0.3s ease;
        padding: 0.75rem 1rem;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;

        &.is-pointed {
          color: colors.$white;
          background-color: color.mix(colors.$white, colors.$body-bg, 10%);
          border-color: color.mix(colors.$white, colors.$body-bg, 15%);
        }
      }
    }
  }

  .icongrid-sort {
    > button {
      background: transparent;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      margin: 0;
      outline: none;
      background-color: color.mix(colors.$white, colors.$body-bg, 7%);
      border: 1px solid color.mix(colors.$white, colors.$body-bg, 15%);
      border-radius: $border-radius;
      transition: all 0.3s ease;

      /* stylelint-disable-next-line no-descending-specificity */
      svg {
        color: colors.$white;
        width: 1.5rem;
        height: 1.5rem;
        transition: all 0.3s ease;
      }

      &:hover {
        border: 1px solid rgba(colors.$white, 0.2);
        background-color: color.mix(colors.$white, colors.$body-bg, 10%);
        box-shadow: 0 0 20px 2px rgba(colors.$white, 0.05);
      }

      &.focus {
        border: 1px solid rgba(colors.$white, 0.4);
        box-shadow: 0 0 20px 2px rgba(colors.$white, 0.05);
      }

      &:hover,
      &.focus {
        /* stylelint-disable-next-line no-descending-specificity */
        svg {
          transform: scale(1.1);
        }
      }
    }
  }

  .icongrid-items {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
    transition: all 0.3s ease;

    @include mixins.breakpoint("sm") {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @include mixins.breakpoint("md") {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @include mixins.breakpoint("lg") {
      gap: 1.5rem;
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    @include mixins.breakpoint("xxl") {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .icongrid-items-empty {
      display: flex;
      width: 100%;
      padding: 3rem 1rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: $border-radius;
      border: 1px solid color.adjust(colors.$body-bg, $lightness: 7%);
      transition: all 0.3s ease;
      grid-column: 1 / -1;
    }

    .icongrid-tile {
      &:hover,
      &:focus {
        opacity: 1 !important;
        box-shadow: 0 0 20px 2px rgba(colors.$white, 0.1);
      }
    }

    &:hover,
    &:focus {
      .icongrid-tile {
        opacity: 0.6;
      }
    }
  }

  .icongrid-search-tags {
    position: relative;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-top: 1rem;
    padding-bottom: 0;
    backface-visibility: visible;

    .icongrid-search-tag {
      text-transform: uppercase;
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }

      &.role {
        background: rgba(colors.$tag-role, 0.2);
        border-color: rgba(colors.$tag-role, 0.8);

        &:hover,
        &:focus {
          background: rgba(colors.$tag-role, 0.4);
        }
      }

      &.organisation {
        background: rgba(colors.$tag-org, 0.2);
        border-color: rgba(colors.$tag-org, 0.8);

        &:hover,
        &:focus {
          background: rgba(colors.$tag-org, 0.4);
        }
      }

      &.squad {
        background: rgba(colors.$tag-squad, 0.2);
        border-color: rgba(colors.$tag-squad, 0.8);

        &:hover,
        &:focus {
          background: rgba(colors.$tag-squad, 0.4);
        }
      }
    }
  }
}

.icongrid-sort-popover {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: $border-radius;
  background-color: color.mix(colors.$black, colors.$body-bg, 55%);
  box-shadow: rgba(colors.$black, 0.35) 0 5px 15px;
  transition: all 0.3s ease;
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 10px;

  &[data-side="top"] {
    animation-name: popover-slide-up;
  }

  &[data-side="bottom"] {
    animation-name: popover-slide-down;
  }

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid color.mix(colors.$black, colors.$body-bg, 55%);
    transform: translateX(-50%);
  }

  .icongrid-sort-popover-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .icongrid-sort-popover-option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1.5rem;
    border: 1px solid color.mix(colors.$black, colors.$body-bg, 20%);
    background-color: color.mix(colors.$black, colors.$body-bg, 35%);
    font-size: 0.875em;
    border-radius: $border-radius;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      border: 1px solid color.mix(colors.$white, colors.$body-bg, 5%);
      background-color: color.mix(colors.$black, colors.$body-bg, 10%);
    }

    &.active {
      color: colors.$white;
      background: rgba(colors.$primary, 0.2);
      border: 1px solid colors.$primary;
    }
  }
}

@include mixins.breakpoint("md") {
  .icongrid {
    .icongrid-searchbar {
      .icongrid-search {
        width: 50%;
      }

      .icongrid-select {
        width: 25%;
        max-width: 20rem;
        min-width: 15rem;
      }
    }
  }
}
</style>
