<template>
  <div class="card-center-container">
    <el-card style="width: 500px">
      <template #header>
        <div class="card-header">
          <span>Register</span>
        </div>
      </template>
<!--debug: use el-form:model to apply rules-->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="form.email"/>
      </el-form-item>
<!--        written by 832302105, do not copy      -->
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" show-password/>
      </el-form-item>
      <el-form-item label="Confirm" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" show-password/>
      </el-form-item>
      </el-form>
      <template #footer>
        <div class="footer-buttons">
          <el-form-item>
            <el-button type="primary" @click="handleRegister" :loading="loading">Register</el-button>
            <el-button @click="$router.push('/login')">Back</el-button>
          </el-form-item>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import api from '../api'
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: '',
})
const handleRegister = async () => {
  try {
    await formRef.value.validate()
    // debug: use loading to resist duplicate register
    loading.value = true

    const registerData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      address: form.address || null,
    }

    await api.register(registerData)
    ElMessage.success('Registered')
    router.push('/login')
  } catch (error) {
    console.error('Fail to register:', error)
  } finally {
    loading.value = false
  }
}

const validatePass = (rule, value, callback) => {
  if (value !== form.password) callback(new Error('Please input the same password'))
  else callback()
}

// check if every form is filled with rule
const rules = {
  name: [{ required: true, message: 'Enter your name', trigger: 'blur' }],
  email: [
    { required: true, message: 'Enter your E-mail', trigger: 'blur' },
    { type: 'email', message: 'Incorrect E-mail format', trigger: 'blur' }
  ],
  phone: [{ required: true, message: 'Enter your phone', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' },
    { min: 6, message: 'Not a valid password', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Confirm again', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
}
</script>

<!--css part-->
<style scoped>
.card-center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.footer-buttons {
  display: flex;
  justify-content: flex-end;
}

</style>