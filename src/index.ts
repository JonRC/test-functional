import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'

import * as Entity from './Entity'
import * as Service from './Service'

const run = async () => {
  const execution = await pipe(
    Service.fetchUsers(),
    TE.map(lastItem),
    TE.map(user => fakePost(user.id)),
    TE.chain(Service.createPost),
    TE.map(post => fakeComment(post.id)),
    TE.chain(Service.creatComment)
  )()

  if (E.isLeft(execution)) return console.log('Error')

  console.log('Success')
}

// pure function
const lastItem = <T>(arr: T[]): T => arr[arr.length - 1]

// pure function
type fakePost = (userId: number) => Omit<Entity.Post, 'id'>

const fakePost: fakePost = userId => ({
  body: 'fake post body',
  title: 'fake post title',
  userId
})

// pure function
type fakeComment = (postId: number) => Omit<Entity.Comment, 'id'>

const fakeComment: fakeComment = postId => ({
  body: 'fake comment body',
  email: 'fake comment email',
  name: 'fake comment name',
  postId
})

run()
