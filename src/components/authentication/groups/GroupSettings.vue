<template>
  <settings-icon id="settings-button" data-dropdown-toggle="group-settings-dropdown" data-dropdown-trigger="click" />

  <div id="group-settings-dropdown"
       class="z-10 hidden rounded-lg shadow w-44 dark:bg-input-background"
  >
    <ul class="py-2 text-sm dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#"
           @click="closeDropdown"
           class="block px-4 py-2">
          <delete-group />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import DeleteGroup from '@/views/grupos/DeleteGroup.vue'
import { Dropdown } from 'flowbite'

export default {
  name: "GroupSettings",
  components: { DeleteGroup, SettingsIcon },
  methods: {
    closeDropdown(){
      const dropdown = new Dropdown(document.getElementById("group-settings-dropdown"),
                                    document.getElementById("settings-button"))
      dropdown.hide()
    }
  }
}
</script>