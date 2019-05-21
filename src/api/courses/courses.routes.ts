export enum CoursesRoutes {
  baseUrl  = 'api/courses',
  course   = ':courseName',
  comments = ':courseName/comments',
  comment  = ':courseName/comments/:commentId',
  answers  = ':courseName/comments/:commentId/answers',
  answer   = ':courseName/comments/:commentId/answers/:answerId',
  learnedLetters = 'lectura/learned-letters/:userId',
}
