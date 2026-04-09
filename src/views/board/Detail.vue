<script setup>
import api from '@/api/board/index'

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const boardId = route.params.idx // URL에서 번호 가져오기

// 1. 상태 관리
const isLoading = ref(true)
const post = ref(null)

// 2. 샘플 데이터 (목록에서 넘겨받은 idx를 기반으로 상세 데이터를 가져오는 시뮬레이션)
const fetchPostDetail = async () => {
  try {
    isLoading.value = true

    const res = await api.getBoardDetail(boardId)

    post.value = {
      ...res,
      category: '자유',
      author: '이구역의대장',
      createdAt: '2026-02-24 15:30',
      views: 124,
      commentsCount: 2,
      profileImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      comments: [
        {
          id: 1,
          author: '이영희',
          content: '반갑습니다',
          date: '10분 전',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anya',
        },
        {
          id: 2,
          author: '박지민',
          content: '오늘 비가 온다는데 조심히 운전하세요!',
          date: '5분 전',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jim',
        },
      ],
    }

    console.log('게시글 상세정보 :', res)
  } catch (error) {
    console.error('상세 정보를 불러오는 중 오류 발생: ', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPostDetail()
})

// 3. 주요 액션
const goBack = () => {
  router.push('/board/list')
}
</script>

<template>
  <div class="detail-wrapper">
    <!-- 상단 네비게이션 -->
    <nav class="top-nav">
      <button @click="goBack" class="back-button"><span class="arrow">←</span> 목록으로</button>
    </nav>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="loading-state">
      <div class="skeleton-title"></div>
      <div class="skeleton-content"></div>
    </div>

    <!-- 상세 내용 -->
    <main v-else-if="post" class="content-container">
      <header class="content-header">
        <div class="post-meta">
          <span class="category" :class="post.category">{{ post.category }}</span>
          <span class="date">{{ post.createdAt }}</span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>

        <div class="user-info-bar">
          <div class="user-profile">
            <img :src="post.profileImg" alt="avatar" class="avatar" />
            <div class="user-text">
              <span class="author">{{ post.author }}</span>
              <span class="views">조회수 {{ post.views }}</span>
            </div>
          </div>
          <button class="share-button">공유하기</button>
        </div>
      </header>

      <section class="post-body">
        <p class="main-text">{{ post.contents }}</p>
      </section>

      <!-- 댓글 섹션 -->
      <section class="comment-section">
        <h3 class="section-title">댓글 {{ post.commentsCount }}</h3>

        <div class="comment-input-wrapper">
          <textarea placeholder="따뜻한 댓글을 남겨주세요."></textarea>
          <button class="submit-comment">등록</button>
        </div>

        <div class="comment-list">
          <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
            <img :src="comment.avatar" alt="avatar" class="comment-avatar" />
            <div class="comment-content">
              <div class="comment-info">
                <span class="comment-author">{{ comment.author }}</span>
                <span class="comment-date">{{ comment.date }}</span>
              </div>
              <p class="comment-text">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div v-else class="empty-state">게시글을 찾을 수 없습니다.</div>
  </div>
</template>

<style scoped>
.detail-wrapper {
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

/* Navigation */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.back-button {
  background: none;
  border: none;
  color: #697386;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}

.back-button:hover {
  color: #4f46e5;
}

.action-group {
  display: flex;
  gap: 12px;
}

.text-btn {
  background: none;
  border: none;
  color: #697386;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 4px 8px;
}

.text-btn.delete {
  color: #f44336;
}

/* Content Container */
.content-container {
  background: white;
  border-radius: 24px;
  padding: 40px;
  border: 1px solid #e3e8ee;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.content-header {
  margin-bottom: 32px;
  border-bottom: 1px solid #f7fafc;
  padding-bottom: 24px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.category {
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  background: #e0e7ff;
  color: #4338ca;
}

.date {
  color: #8792a2;
  font-size: 0.9rem;
}

.post-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.user-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f4f4f4;
}

.user-text {
  display: flex;
  flex-direction: column;
}

.author {
  font-weight: 700;
  font-size: 1rem;
}

.views {
  font-size: 0.85rem;
  color: #8792a2;
}

.share-button {
  background: #f7fafc;
  border: 1px solid #e3e8ee;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

/* Post Body */
.post-body {
  min-height: 100px;
  margin-bottom: 48px;
}

.main-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #3c4257;
  white-space: pre-wrap; /* 줄바꿈 유지 */
}

/* Comments */
.comment-section {
  border-top: 1px solid #f7fafc;
  padding-top: 32px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.comment-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.comment-input-wrapper textarea {
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #e3e8ee;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  outline: none;
}

.comment-input-wrapper textarea:focus {
  border-color: #4f46e5;
}

.submit-comment {
  align-self: flex-end;
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-item {
  display: flex;
  gap: 16px;
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.comment-info {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 6px;
}

.comment-author {
  font-weight: 700;
  font-size: 0.95rem;
}

.comment-date {
  font-size: 0.85rem;
  color: #8792a2;
}

.comment-text {
  color: #4f566b;
  font-size: 1rem;
  line-height: 1.5;
}

/* Skeleton */
.skeleton-title {
  height: 40px;
  background: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 20px;
}

.skeleton-content {
  height: 200px;
  background: #f0f0f0;
  border-radius: 12px;
}

@media (max-width: 600px) {
  .detail-wrapper {
    padding: 20px 16px;
  }
  .content-container {
    padding: 24px;
  }
  .post-title {
    font-size: 1.5rem;
  }
}
</style>
