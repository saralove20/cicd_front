<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 1. 상태 관리
const isScrolled = ref(false)

// 2. 스크롤 이벤트 처리 (상단 고정 시 그림자 효과)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 3. 버튼 액션
const handleLogin = () => {
  console.log('로그인 페이지로 이동')
}

const handleSignup = () => {
  console.log('회원가입 페이지로 이동')
}
</script>

<template>
  <!-- 헤더가 fixed이므로 아래 컨텐츠가 가려지지 않도록 공간을 확보해주는 요소 -->
  <div class="header-placeholder"></div>

  <header :class="['header-wrapper', { 'is-scrolled': isScrolled }]">
    <div class="header-container">
      <!-- 빈 공간 (버튼을 우측으로 밀기 위함) -->
      <div class="spacer"></div>

      <!-- 인증 섹션 -->
      <div class="auth-section">
        <button @click="handleLogin" class="auth-btn"></button>
        <button @click="handleSignup" class="auth-btn highlight"></button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 헤더 높이만큼 공간 확보 (콘텐츠 잘림 방지) */
.header-placeholder {
  height: 80px;
}

.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.header-wrapper.is-scrolled {
  height: 70px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 스크롤 시 placeholder는 그대로 80px을 유지하여 레이아웃 흔들림 방지 
   만약 헤더와 함께 줄어들길 원하면 스크롤 상태에 따라 클래스 조절 가능 */

.header-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.spacer {
  flex: 1;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
}

.auth-btn {
  background: none;
  border: none;
  color: #4f566b;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.auth-btn:hover {
  background-color: #f1f3f5;
  color: #1a1f36;
}

.auth-btn.highlight {
  color: #1a1f36;
  font-weight: 700;
}

.auth-btn.highlight:hover {
  background-color: #e9ecef;
}

@media (max-width: 600px) {
  .header-placeholder {
    height: 64px;
  }
  .header-wrapper {
    height: 64px;
  }
  .header-container {
    padding: 0 16px;
  }
  .auth-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
}
</style>
