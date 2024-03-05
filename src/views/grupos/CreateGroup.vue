<template>
  <block-section nopx="true">
    <form class="space-y-6">
      <form-group>
        <span-label>{{ $t("createGroup.nombreLabel")}}</span-label>
        <variable-input input-type="text" v-model="newGroup.nombre" />
        <small-error field-name="nombre" />
      </form-group>
      <form-group>
        <span-label>{{ $t("createGroup.descripcionLabel")}}</span-label>
        <variable-input input-type="text" v-model="newGroup.descripcion" />
        <small-error field-name="descripcion" />
      </form-group>
      <div class="flex flex-row gap-4">
        <form-group>
          <span-label>{{ $t("createGroup.precioMinimoLabel")}}</span-label>
          <variable-input input-type="number" v-model="newGroup.precio_minimo" />
          <small-error field-name="precio_minimo" />
        </form-group>
        <form-group>
          <span-label>{{ $t("createGroup.precioMaximoLabel")}}</span-label>
          <variable-input input-type="number" v-model="newGroup.precio_maximo" />
          <small-error field-name="precio_maximos" />
        </form-group>
      </div>
      <form-group>
        <span-label>{{ $t("createGroup.tematicaRegalosLabel")}}</span-label>
        <variable-input input-type="text" v-model="newGroup.tematica_regalos" />
        <small-error field-name="tematica_regalos" />
      </form-group>
      <div>
        <div class="flex flex-row items-center space-x-2">
          <label for="autoasignacion-input">
            <span-label>{{ $t("createGroup.fechaAutoasignacionLabel")}}</span-label>
          </label>
          <info-circle class="z-10 w-6 h-6" data-tooltip-target="tooltip-click" data-tooltip-trigger="click" />
          <div id="tooltip-click" role="tooltip" class="absolute z-20 invisible inline-block px-4
          py-2 text-sm font-medium text-white rounded-lg shadow-sm opacity-0
          tooltip dark:bg-input-background">
            {{ $t("createGroup.fechaAutoasignacionTooltip") }}
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <variable-input id="autoasignacion-input" input-type="datetime-local" v-model="newGroup.fecha_autoasignacion" />
        <small-error field-name="fecha_autoasignacion" />
      </div>
      <form-group>
        <button-submit processing-id="create-group-submit" @button-submit="createGroup">
          {{ $t("createGroup.createGroupBtn") }}
        </button-submit>
      </form-group>
    </form>
  </block-section>
</template>

<script>
import { useGroupsStore } from '@/stores/groups.js'
import BlockSection from '@/components/containers/BlockSection.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import InfoCircle from '@/components/icons/InfoCircle.vue'

export default {
  name: "CreateGroup",
  components: { InfoCircle, ButtonSubmit, SmallError, VariableInput, SpanLabel, FormGroup, BlockSection },

  emits: ["groupCreated"],

  data() {
    return {
      newGroup: {
        nombre: "",
        descripcion: "",
        precio_minimo: "",
        precio_maximo: "",
        tematica_regalos: "",
        fecha_autoasignacion: ""
      }
    }
  },

  methods: {
    async createGroup() {
      const response = await useGroupsStore().actionCreateGroup(this.newGroup)
      removeIdFromProcessing("create-group-submit")

      if(response) {
        this.$emit("groupCreated")
      }
    }
  }
}
</script>