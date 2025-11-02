<template>
  <el-card style="max-width:800px;margin:0 auto">
<!--  we can use v-if for improvement: click the "edit" -> model=form, else=text  -->
    <el-descriptions :column="1" border>
      <el-descriptions-item label="UID">{{ info.uid }}</el-descriptions-item>
      <el-descriptions-item label="Name">
        <el-input v-model="form.name" v-if="editing" />
        <span v-else>{{ info.name }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="E-mail">
        <el-input v-model="form.email" v-if="editing" />
        <span v-else>{{ info.email }}</span>
<!--        made by 832302105       -->
      </el-descriptions-item>
      <el-descriptions-item label="Phone">
        <el-input v-model="form.phone" v-if="editing" />
        <span v-else>{{ info.phone }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        <el-input v-model="form.address" v-if="editing" />
        <span v-else>{{ info.address || 'Not set' }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <div class="footer">
        <el-button v-if="!editing" type="primary" @click="editing = true">Edit</el-button>
        <div v-else>
          <el-button type="primary" @click="save">Save</el-button>
          <el-button @click="cancel">Cancel</el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api'

const info = ref({})
const form = reactive({})
const editing = ref(false)

const load = async () => {
  try {
    info.value = await api.getUser()
    Object.assign(form, info.value)
  } catch (error) {
    console.error(error)
  }
}

const save = async () => {
  try {
    await api.updateUser(form)
    ElMessage.success('Updated')
    editing.value = false
    load()
  } catch (error) {
    console.error(error)
  }
}

const cancel = () => {
  editing.value = false
  Object.assign(form, info.value)
}

onMounted(() => {
  load()
})
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>