<template>
  <div class="card-center-container">
    <el-card style="width: 500px">
      <template #header>
        <div class="card-header">
          <span>Login</span>
        </div>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="UID/Name/E-mail/Phone" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="Password" show-password />
        </el-form-item>
      </el-form>
<!--      debug: use #footer outside the el-form for display error    -->
      <template #footer>
        <div class="footer-buttons">
          <el-form-item>
            <el-button type="primary" @click="handleLogin" :loading="loading">Login</el-button>
            <el-button @click="$router.push('/register')">Register</el-button>
          </el-form-item>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from '../api'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const form = reactive({ account: '', password: '' })
const rules = {
  account: [{ required: true, message: 'Please input your account', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
}

const handleLogin = async () => {
  try {
    await formRef.value.validate()
    // debug: use loading to resist duplicate login
    loading.value = true
    const res = await api.login(form)
    localStorage.setItem('token', res.token)
    localStorage.setItem('userName', res.name)
    ElMessage.success('Login successful')
    router.push('/')
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}
</script>

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