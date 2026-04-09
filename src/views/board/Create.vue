<script setup>
import api from '@/api/board/index'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. 상태 관리
const isSubmitting = ref(false)
const formData = ref({
  title: '',
  contents: '',
})

// 2. 카테고리 옵션
const categories = ['자유', '카풀', '질문', '공지']

// 3. 액션 핸들러
const handleSubmit = async () => {
  if (!formData.value.title.trim()) {
    alert('제목을 입력해주세요.')
    return
  }
  if (!formData.value.contents.trim()) {
    alert('내용을 입력해주세요.')
    return
  }

  try {
    isSubmitting.value = true

    const res = await api.createBoard(formData.value)
    console.log('등록된 게시글 데이터:', res)

    alert('게시글이 성공적으로 등록되었습니다.')
    router.push(`/board/${res.idx}`)
  } catch (error) {
    console.error('등록 중 오류 발생:', error)
    alert('등록에 실패했습니다.')
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  if (confirm('작성 중인 내용은 저장되지 않습니다. 취소하시겠습니까?')) {
    console.log('작성 취소')
    router.push('/board/list')
  }
}
</script>

<template>
  <div class="write-wrapper">
    <!-- 상단 헤더 -->
    <header class="write-header">
      <h1 class="title">새글쓰기</h1>
      <p class="subtitle">커뮤니티에 새로운 소식을 공유해보세요.</p>
    </header>

    <!-- 작성 폼 -->
    <main class="form-container">
      <div class="form-group">
        <label for="category">카테고리</label>
        <div class="category-selector">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="category-chip"
            :class="{ active: formData.category === cat }"
            @click="formData.category = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="title">제목</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          placeholder="제목을 입력하세요"
          class="form-input"
          maxlength="100"
        />
      </div>

      <div class="form-group">
        <label for="contents">내용</label>
        <textarea
          id="contents"
          v-model="formData.contents"
          placeholder="내용을 상세히 적어주세요. (카풀이라면 시간, 장소 등을 포함해주세요)"
          class="form-textarea"
        ></textarea>
      </div>

      <!-- 하단 액션 버튼 -->
      <footer class="form-actions">
        <button @click="handleCancel" class="btn-secondary" :disabled="isSubmitting">취소</button>
        <button @click="handleSubmit" class="btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? '등록 중...' : '등록하기' }}
        </button>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.write-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #fcfcfd;
  min-height: 100vh;
  color: #1a1f36;
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    sans-serif;
}

/* Header */
.write-header {
  margin-bottom: 32px;
}

.title {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #697386;
  font-size: 1rem;
}

/* Form Container */
.form-container {
  background: white;
  border-radius: 24px;
  padding: 40px;
  border: 1px solid #e3e8ee;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.form-group {
  margin-bottom: 28px;
}

.form-group label {
  display: block;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 12px;
  color: #4f566b;
}

/* Category Selector */
.category-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-chip {
  padding: 8px 18px;
  border-radius: 10px;
  border: 1px solid #e3e8ee;
  background: white;
  font-size: 0.9rem;
  font-weight: 600;
  color: #697386;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-chip:hover {
  background: #f7fafc;
  border-color: #d1d9e2;
}

.category-chip.active {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

/* Inputs */
.form-input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #e3e8ee;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-textarea {
  width: 100%;
  min-height: 300px;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid #e3e8ee;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f7fafc;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #4338ca;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  background-color: #a3acb9;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f7fafc;
  color: #4f566b;
  border: 1px solid #e3e8ee;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #edf2f7;
}

@media (max-width: 600px) {
  .write-wrapper {
    padding: 20px 16px;
  }
  .form-container {
    padding: 24px;
  }
  .form-actions {
    flex-direction: column-reverse;
  }
  .form-actions button {
    width: 100%;
  }
}
</style>
