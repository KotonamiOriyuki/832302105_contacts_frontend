<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <span>Contacts</span>
      </div>
      <el-dropdown @command="handleCommand">
        <span>{{ userName }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside :width="'200px'" class="aside">
        <el-menu :default-active="$route.path" router>
          <el-menu-item index="/home">
            <el-icon><House /></el-icon>
            <template #title>Contact List</template>
          </el-menu-item>
          <el-menu-item index="/profile">
            <el-icon><User /></el-icon>
            <template #title>You</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
<!--        we have written in router: home.vue for contact list, person.vue for personal information      -->
        <router-view v-slot="{ Component }">
<!--        debug: use keep-alive to preserve session   -->
          <keep-alive>
            <component :is="Component" :key="$route.path" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { House, User } from '@element-plus/icons-vue'
import api from '../api'

const router = useRouter()
const userName = ref(localStorage.getItem('userName') || 'User')

const handleCommand = async (cmd) => {
  if (cmd === 'logout') {
    await api.logout()
    localStorage.clear()
    router.push('/login')
    ElMessage.success('Logout')
  }
}

</script>

<style scoped>
.layout {
  height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
}
.left {
  display: flex;
  align-items: center;
  gap: 20px;
}
.main {
  background: #f5f5f5;
}
.aside {
  border-right: 1px solid #e6e6e6;
}
</style>