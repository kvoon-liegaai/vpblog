import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"你好 世界"},["/index.html","/README.md"]],
  ["v-7446daa2","/foo/",{"title":"fooooooo"},["/foo/index.html","/foo/README.md"]],
  ["v-54370fdc","/notebook/vue%E7%AC%94%E8%AE%B0.html",{"title":"VUE笔记"},["/notebook/vue笔记.html","/notebook/vue%E7%AC%94%E8%AE%B0","/notebook/vue笔记.md","/notebook/vue%E7%AC%94%E8%AE%B0.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
