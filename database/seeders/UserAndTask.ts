import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'
import Task from 'App/Models/Task'

export default class extends BaseSeeder {
  public async run() {

    await User.createMany([
      {
        roleId: Roles.MEMBER,
        email: 'member@example.com',
        password: 'password',
        username: 'member',
        age: 15,
        name: 'normal member',
      },
      {
        roleId: Roles.PROMEMBER,
        email: 'promember@example.com',
        password: 'password',
        username: 'promember',
        name: 'pro member',
      },
      {
        roleId: Roles.MODERATOR,
        email: 'moderator@example.com',
        password: 'password',
        username: 'moderator',
        age: 27,
        familyName: 'moderator',
      },
      {
        roleId: Roles.ADMIN,
        email: 'admin@example.com',
        password: 'secret',
        username: 'admin',
        age: 27,
      },
    ])

    await Profile.createMany([
      {
        userId: 1,
        biography: 'member bio'
      },
      {
        userId: 2
      },
      {
        userId: 3,
        biography: 'I am a moderator on this site, been here from the beginning, and will stay here to keep the site safe'
      },
      {
        userId: 4
      },
    ])
    Task.createMany([
      {
        userId: 1,
        title: 'Task title is required',
        body: 'Task body is not required'
      },
      {
        userId: 2,
        title: 'Im a Pro Members',
      },
      {
        userId: 2,
        title: 'The Admin does not have a task, well I have 3',
      },
      {
        userId: 2,
        title: 'You can test the Search by using the search word',
        body: 'And it works, lorem ipsum dolor sit'
      },
      {
        userId: 3,
        title: 'title is not unique',
      },
      {
        userId: 3,
        title: 'title is not unique',
      },
      {
        userId: 3,
        title: 'title is not unique',
        body: 'neither is the body'
      },
      {
        userId: 3,
        title: 'delete me',
      },
      {
        userId: 3,
        title: 'change me',
      },
    ])

    const user = await User.create({
      roleId: Roles.MEMBER,
      email: 'johndoe@example.com',
      password: 'supersecret',
      username: 'john doe',
    })
    await Profile.create({
      userId: user.id,
      biography: 'the regular old john doe we all know and love'
    })
    await Task.create({
      userId: user.id,
      title: 'A task for John Doe',
      body: 'you can upload photos manually to the thumbnail'
    })
  }
}
