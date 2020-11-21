// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')
module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    //侧边栏菜单
    const constantRouterMap = [
      {
        path: '/news',
        icon: 'el-icon-star-off',
        title: '最新动态'
      },
      {
        path: '/social',
        icon: 'el-icon-mobile-phone',
        title: '社交圈'
      },
      {
        path: '/blog',
        icon: 'el-icon-edit-outline',
        title: '博客列表'
      },
      {
        path: '/project',
        icon: 'el-icon-service',
        title: '开源项目'
      },
    ]

    const sidebar = addCollection('Sidebar')
    for (const item of constantRouterMap) {
      sidebar.addNode({
        path: item.path,
        icon: item.icon,
        title: item.title
      })
    }
  })
  // 最新动态
  api.loadSource(async ({ addCollection }) => {
    const { data } = await axios.get('https://api.github.com/gists/391edc7de20627506f8cee6a756f8a34')

    const newsblog = addCollection('NewsBlog')
    for (const item in data.files) {
      newsblog.addNode({
        id: data.id,
        title: item,
        content: data.files[item].content,
        description: data.description,
        createTime: data.created_at,
        updateTime: data.updated_at
      })
    }
  })

  // 博客列表
  api.loadSource(async ({ addCollection }) => {
    const { data } = await axios.get('https://api.github.com/users/GitHub-Laziji/gists')

    const blogs = addCollection('Blogs')
    for (const blog of data) {
      for (const item in blog.files) {
        blogs.addNode({
          id: blog.id,
          title: item,
          description: blog.description,
          createTime: blog.created_at,
          updateTime: blog.updated_at,
        })
      }
    }
  })

  // 开源项目
  api.loadSource(async ({ addCollection }) => {
    const { data } = await axios.get('https://api.github.com/users/GitHub-Laziji/repos')
    const projects = addCollection('Projects')
    for (const item of data) {
      projects.addNode({
        id: item.id,
        name: item.name,
        url: item.html_url,
        description: item.description,
        stargazersCount: item.stargazers_count,
        watchersCount: item.watchers_count,
        forksCount: item.forks_count,
        language: item.language,
        license: item.license ? item.license.spdx_id : null,
        createTime: item.created_at,
        updateTime: item.updated_at,
        hide: false
      })
    }
  })

  // 粉丝
  api.loadSource(async ({ addCollection }) => {
    const { data } = await axios.get('https://api.github.com/users/GitHub-Laziji/followers')
    const followers = addCollection('Followers')
    for (const item of data) {
      followers.addNode({
        id: item.id,
        name: item.login,
        avatar: item.avatar_url,
        avatarUrl: item.html_url
      })
    }
  })

  // 关注
  api.loadSource(async ({ addCollection }) => {
    const { data } = await axios.get('https://api.github.com/users/GitHub-Laziji/following')
    const following = addCollection('Following')
    for (const item of data) {
      following.addNode({
        id: item.id,
        name: item.login,
        avatar: item.avatar_url,
        avatarUrl: item.html_url
      })
    }
  })

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/news',
      component: './src/templates/News.vue'
    })

    createPage({
      path: '/blog',
      component: './src/templates/Blog.vue'
    })

    createPage({
      path: '/project',
      component: './src/templates/Project.vue'
    })

    createPage({
      path: '/project/:id',
      component: './src/templates/ProjectDetails.vue'
    })

    createPage({
      path: '/social',
      component: './src/templates/Social.vue'
    })
  })

  // 博客详情页
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allBlogs{
        edges {
          node {
            id
            title
            description
            createTime
            updateTime
          }
        }
      }
    }`)
    data.allBlogs.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${node.id}`,
        component: './src/templates/BlogDetails.vue',
        context: {
          id: node.id,
          title: node.title,
          description: node.description,
          createTime: node.createTime,
          updateTime: node.updateTime
        }
      })
    })
  })

  // 开源项目详情页
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allProjects {
        edges {
          node {
            id
            name
            url
            description
            stargazersCount
            watchersCount
            forksCount
            language
            license
            createTime
            updateTime
            hide
          }
        }
      }
    }`)
    data.allProjects.edges.forEach(({ node }) => {
      createPage({
        path: `/project/${node.id}`,
        component: './src/templates/ProjectDetails.vue',
        context: {
          id: node.id,
          name: node.name,
          url: node.url,
          description: node.description,
          stargazersCount: node.stargazersCount,
          watchersCount: node.watchersCount,
          forksCount: node.forksCount,
          language: node.language,
          license: node.license,
          createTime: node.createTime,
          updateTime: node.updateTime,
          hide: node.hide
        }
      })
    })
  })

  // 粉丝详情页
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allFollowers {
        edges {
          node {
            id
            name
            avatar
            avatarUrl
          }
        }
      }
    }`)
    data.allFollowers.edges.forEach(({ node }) => {
      createPage({
        path: `/social/${node.name}`,
        component: './src/templates/SocialDetails.vue',
        context: {
          id: node.id,
          name: node.name,
          avatar: node.avatar,
          avatarUrl: node.avatarUrl
        }
      })
    })
  })

  // 关注者情页
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allFollowing {
        edges {
          node {
            id
            name
            avatar
            avatarUrl
          }
        }
      }
    }`)
    data.allFollowing.edges.forEach(({ node }) => {
      createPage({
        path: `/social/${node.name}`,
        component: './src/templates/SocialDetails.vue',
        context: {
          id: node.id,
          name: node.name,
          avatar: node.avatar,
          avatarUrl: node.avatarUrl
        }
      })
    })
  })
}
