import api from '@/plugins/axiosinterceptor'

// 게시글 목록 조회 (전체 조회)
const getBoardList = async (req) => {
  const res = await api.get('/board/read/list', req)
  return res.data
}

// 게시글 상세 조회
const getBoardDetail = async (boardId) => {
  const res = await api.get(`/board/read/${boardId}`)
  return res.data
}

// 게시글 작성
const createBoard = async (boardCreateData) => {
  const res = await api.post('/board/register', boardCreateData)
  return res.data
}

// 게시글 수정
const updateBoard = async (boardId, boardCreateData) => {
  const res = await api.put(`/board/${boardId}`, boardCreateData)
  return res.data
}

// 게시글 삭제
const deleteBoard = async (boardId) => {
  const res = await api.delete(`/board/${boardId}`)
  return res.data
}

export default { getBoardList, getBoardDetail, createBoard, updateBoard, deleteBoard }
