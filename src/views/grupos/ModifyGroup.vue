<template>
  <a href="#"
     data-modal-target="modify-group-modal"
     data-modal-toggle="modify-group-modal"
     class="flex flex-row items-center justify-center px-4 py-2 space-x-1"
  >
    <edit-icon />
    <span>{{ $t("modifyGroup.modifyGroupBtn")}}</span>
  </a>

  <full-screen-modal  modal-id="modify-group-modal">
    <form class="space-y-6">
      <form-group>
        <span-label>{{ $t("modifyGroup.nombreLabel")}}</span-label>
        <variable-input input-type="text" v-model="modifyGroup.nombre" />
        <small-error field-name="nombre" />
      </form-group>
      <form-group>
        <span-label>{{ $t("modifyGroup.descripcionLabel")}}</span-label>
        <variable-input input-type="text" v-model="modifyGroup.descripcion" />
        <small-error field-name="descripcion" />
      </form-group>
      <div class="flex flex-row gap-4">
        <form-group>
          <span-label>{{ $t("modifyGroup.precioMinimoLabel")}}</span-label>
          <variable-input input-type="number" v-model="modifyGroup.precio_minimo" />
          <small-error field-name="precio_minimo" />
        </form-group>
        <form-group>
          <span-label>{{ $t("modifyGroup.precioMaximoLabel")}}</span-label>
          <variable-input input-type="number" v-model="modifyGroup.precio_maximo" />
          <small-error field-name="precio_maximos" />
        </form-group>
      </div>
      <form-group>
        <span-label>{{ $t("modifyGroup.tematicaRegalosLabel")}}</span-label>
        <variable-input input-type="text" v-model="modifyGroup.tematica_regalos" />
        <small-error field-name="tematica_regalos" />
      </form-group>
      <div>
        <div class="flex flex-row items-center space-x-2">
          <label for="autoasignacion-input">
            <span-label>{{ $t("modifyGroup.fechaAutoasignacionLabel")}}</span-label>
          </label>
          <info-circle class="z-10 w-6 h-6" data-tooltip-target="tooltip-click" data-tooltip-trigger="click" />
          <div id="tooltip-click" role="tooltip" class="absolute z-20 invisible inline-block px-4
          py-2 text-sm font-medium text-white rounded-lg shadow-sm opacity-0
          tooltip dark:bg-input-background">
            {{ $t("createGroup.fechaAutoasignacionTooltip") }}
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <variable-input id="autoasignacion-input" input-type="datetime-local" v-model="modifyGroup.fecha_autoasignacion" />
        <small-error field-name="fecha_autoasignacion" />
      </div>
      <form-group>
        <button-submit processing-id="modify-group-submit" @button-submit="modifyGroupFn">
          {{ $t("modifyGroup.modifyGroupBtn") }}
        </button-submit>
      </form-group>
    </form>
  </full-screen-modal>
</template>

<script>
import { useGroupsStore } from '@/stores/groups.js'
import { removeIdFromProcessing } from '@/helpers/Helpers.js'
import FormGroup from '@/components/forms/FormGroup.vue'
import SpanLabel from '@/components/forms/SpanLabel.vue'
import VariableInput from '@/components/forms/inputs/VariableInput.vue'
import SmallError from '@/components/forms/SmallError.vue'
import InfoCircle from '@/components/icons/InfoCircle.vue'
import ButtonSubmit from '@/components/forms/ButtonSubmit.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import { useGeneralStore } from '@/stores/general.js'
import FullScreenModal from '@/components/containers/FullScreenModal.vue'

export default {
  name: "ModifyGroup",
  components: { FullScreenModal, EditIcon, ButtonSubmit, InfoCircle, SmallError, VariableInput, SpanLabel, FormGroup },

  inject: ["groupId"],

  emits: ["groupModified"],

  data() {
    return {
      //Duplico el objeto para no tener la referencia y así, conservar el estado hasta que pulse en guardar
      modifyGroup: JSON.parse(JSON.stringify(useGroupsStore().actionGetGroup(this.groupId)))
    }
  },

  methods: {
    async modifyGroupFn() {
      const response = await useGroupsStore().actionModifyGroup(this.groupId ,this.modifyGroup)
      removeIdFromProcessing("modify-group-submit")

      if(response) {
        document.querySelector("#modify-group-modal .closebtn").click()

        useGeneralStore().actionShowAlert(this.$t("modifyGroup.modifyAlert"), "success")

        this.$emit("groupModified")
      }
    }
  }
}
</script>