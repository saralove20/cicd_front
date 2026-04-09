<script setup>
import api from '@/api/board/index'
import PageHeader from '@/components/layout/Header.vue'

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. 상태 관리
const searchQuery = ref('')
const isLoading = ref(true)
const posts = ref([])

// 2. 샘플 데이터 (실제 API 연동 시 이 부분을 fetch 로직으로 대체)
const fetchPosts = async () => {
  try {
    isLoading.value = true
    const res = await api.getBoardList()

    posts.value = (res || []).map((post) => ({
      ...post,
      category: '자유', // 기본 카테고리
      author: '이구역의대장', // 기본 작성자
      createdAt: '방금 전', // 기본 작성일
      views: 53, // 기본 조회수
      comments: 5, // 기본 댓글수
      profileImg: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.idx}`, // 고유한 아바타 생성
    }))

    console.log('게시글 목록 조회: ', res)
  } catch (error) {
    console.error('게시글 목록을 불러오는 중 오류 발생: ', error)
  } finally {
    isLoading.value = false
  }
}

// 3. 검색 필터 로직
const filteredPosts = computed(() => {
  return posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(() => {
  fetchPosts()
})

const goToDetail = (idx) => {
  router.push(`/board/${idx}`)
}

const goToCreate = () => {
  router.push('/board/reg')
}
</script>

<template>
  <PageHeader />
  <div class="board-wrapper">
    <!-- 상단 헤더 섹션 -->
    <header class="board-header">
      <div class="header-content">
        <h1 class="title">커뮤니티</h1>
        <p class="subtitle">다양한 사람들과 실시간으로 소통해보세요.</p>
      </div>
      <button class="write-button" @click="goToCreate"><span class="icon">+</span> 새글쓰기</button>
    </header>

    <!-- 검색 및 필터 섹션 -->
    <section class="search-section">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input v-model="searchQuery" type="text" placeholder="관심 있는 글을 검색해보세요" />
      </div>
    </section>

    <!-- 게시글 리스트 -->
    <main class="post-list">
      <div v-if="isLoading" class="skeleton-loader">
        <div v-for="n in 3" :key="n" class="skeleton-card"></div>
      </div>

      <div v-else-if="filteredPosts.length > 0">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="post-card"
          @click="goToDetail(post.idx)"
        >
          <div class="card-body">
            <div class="post-meta">
              <span class="category" :class="post.category">{{ post.category }}</span>
              <span class="dot">·</span>
              <span class="date">{{ post.createdAt }}</span>
            </div>
            <h2 class="post-title">{{ post.title }}</h2>

            <div class="card-footer">
              <div class="user-info">
                <img :src="post.profileImg" alt="avatar" class="avatar" />
                <span class="author">{{ post.author }}</span>
              </div>
              <div class="stats">
                <span class="stat-item"> <i class="stat-icon">👁</i> {{ post.views }} </span>
                <span class="stat-item"> <i class="stat-icon">💬</i> {{ post.comments }} </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <p>검색 결과가 없습니다.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Base Styles */
.board-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px;
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
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}

.title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.subtitle {
  color: #697386;
  font-size: 1rem;
}

.write-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.write-button:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
}

/* Search */
.search-section {
  margin-bottom: 24px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e3e8ee;
  padding: 12px 18px;
  border-radius: 14px;
  gap: 12px;
  transition: border-color 0.2s;
}

.search-bar:focus-within {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-bar input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  color: #3c4257;
}

/* Post Cards */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #e3e8ee;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
  border-color: #d1d9e2;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 0.85rem;
}

.category {
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
}

.category.카풀 {
  background: #e0e7ff;
  color: #4338ca;
}
.category.자유 {
  background: #fef3c7;
  color: #92400e;
}
.category.공지 {
  background: #fee2e2;
  color: #b91c1c;
}

.date {
  color: #8792a2;
}
.dot {
  color: #d1d9e2;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px; /* 본문이 없으므로 하단 여백을 조금 늘림 */
  line-height: 1.4;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f7fafc;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f4f4f4;
}

.author {
  font-weight: 600;
  font-size: 0.9rem;
  color: #3c4257;
}

.stats {
  display: flex;
  gap: 16px;
  color: #8792a2;
  font-size: 0.85rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Skeleton Loader */
.skeleton-card {
  height: 120px; /* 내용이 빠졌으므로 로딩 높이도 줄임 */
  background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 20px;
  margin-bottom: 16px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.empty-state {
  text-align: center;
  padding: 100px 0;
  color: #8792a2;
}

/* Responsive */
@media (max-width: 600px) {
  .board-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .write-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
