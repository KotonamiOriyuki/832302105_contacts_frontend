<template>
  <div class="home">
    <div class="header">
      <el-button type="primary" @click="showAddDialog">Add contacts</el-button>
    </div>

    <el-table :data="contacts" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="email" label="E-mail" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="address" label="Address" />
      <el-table-column label="" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="editContact(row)">Edit</el-button>
          <el-button size="small" type="danger" @click="deleteContact(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? 'Edit Contacts' : 'Add Contacts'" width="500px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">

        <el-form-item label="UID" v-if="!isEdit">
          <el-input v-model="form.uid" placeholder="You can enter UID directly to add contacts" @input="onUidChange" />
        </el-form-item>
<!--disable everything if uid is entered-->
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" :disabled="!!form.uid" />
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="form.email" :disabled="!!form.uid" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone" :disabled="!!form.uid" />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="form.address" :disabled="!!form.uid" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveContact" :loading="saving">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api'

const loading = ref(false)
const contacts = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const saving = ref(false)
const formRef = ref(null)
const currentId = ref('')

const form = reactive({
  uid: '',
  name: '',
  email: '',
  phone: '',
  address: '',
})

const rules = {
  name: [{ required: true, message: 'Enter your name', trigger: 'blur' }]
}

const loadContacts = async () => {
  try {
    // debug: use loading to avoid duplicate api call
    loading.value = true
    contacts.value = await api.getContacts()
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}

const showAddDialog = () => {
  isEdit.value = false
  dialogVisible.value = true
  Object.assign(form, { uid: '', name: '', email: '', phone: '', address: ''})
}

const editContact = (row) => {
  isEdit.value = true
  currentId.value = row._id
  dialogVisible.value = true
  Object.assign(form, {
    uid: '',
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
  })
}

// clear other things when uid is entered
const onUidChange = () => {
  if (form.uid) {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.address = ''
  }
}

const saveContact = async () => {
  try {
    // visit the addfriend api if uid is entered
    if (form.uid && !isEdit.value) {
      saving.value = true

      await api.addFriend(form.uid)
      ElMessage.success('Added')

      saving.value = false
      dialogVisible.value = false
      loadContacts()
      return
    }
    await formRef.value.validate()
    saving.value = true

    if (isEdit.value) {
      await api.updateContact(currentId.value, form)
      ElMessage.success('Update successful')
    } else {
      await api.createContact(form)
      ElMessage.success('Add successful')
    }
    dialogVisible.value = false
    loadContacts()
    saving.value = false
  } catch (error) {
    ElMessage.error(error.message || 'Failed!')
    console.error(error)
    saving.value = false
  }
}

const deleteContact = async (row) => {
  try {
    await api.deleteContact(row._id)
    ElMessage.success('Deleted')
    loadContacts()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadContacts()
})
</script>

<style scoped>
.home {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>