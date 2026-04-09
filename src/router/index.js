import { createRouter, createWebHistory } from 'vue-router'

import BoardList from '@/views/board/List.vue'
import BoardDetail from '@/views/board/Detail.vue'
import BoardCreate from '@/views/board/Create.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', alias: '/board/list', component: BoardList },
    { path: '/board/:idx', component: BoardDetail }, // 동적 라우팅 (게시글 번호에 따라)
    { path: '/board/reg', component: BoardCreate },
  ],
})

export default router
