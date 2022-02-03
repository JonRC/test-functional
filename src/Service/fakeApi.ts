import * as TE from 'fp-ts/TaskEither'
import axios from 'axios'

import * as AppError from '../AppError'
import * as Entity from '../Entity'

const fakeApiUrl = 'https://jsonplaceholder.typicode.com'

// side-effects
type fetchUsers = () => TE.TaskEither<
  AppError.InternalServerError,
  Entity.User[]
>

export const fetchUsers: fetchUsers = () =>
  TE.tryCatch(async () => {
    const usersUrl = `${fakeApiUrl}/users`

    const { data } = await axios.get<Entity.User[]>(usersUrl)

    // console.log({ users: data }) // discoment to see the fetched users

    return data
  }, AppError.internalServerError({ message: 'Error fetching users on fakeApi' }))

// side-effects
type createPost = (
  post: Omit<Entity.Post, 'id'>
) => TE.TaskEither<AppError.InternalServerError, Entity.Post>

export const createPost: createPost = post =>
  TE.tryCatch(async () => {
    const postsUrl = `${fakeApiUrl}/posts`

    const { data } = await axios.post<Entity.Post>(postsUrl, {
      data: post,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // console.log({ post: data }) // discoment to see the created post

    return data
  }, AppError.internalServerError({ message: 'Error creating post on fakeApi' }))

// side-effects
type creatComment = (
  comment: Omit<Entity.Comment, 'id'>
) => TE.TaskEither<AppError.InternalServerError, Entity.Comment>

export const creatComment: creatComment = comment =>
  TE.tryCatch(
    async () => {
      const commentsUrl = `${fakeApiUrl}/comments`

      const { data } = await axios.post<Entity.Comment>(commentsUrl, {
        data: comment,
        Headers: {
          'Content-Type': 'application/json'
        }
      })

      // console.log({ comment: data }) // discoment to see the created comment

      return data
    },
    AppError.internalServerError({
      message: 'Error creating comment on fakeApi'
    })
  )
