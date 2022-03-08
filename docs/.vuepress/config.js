module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: 'kvoon',
    description: '这是我的第一个 VuePress 站点',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    // 如果你按照 `organization/repository` 的格式设置它

    

    //主题配置
    themeConfig: {
        //图标
        //logo: '/assets/img/logo.png',
        logo: 'https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/icon/lidog3',
        navbar: [
            // NavbarItem
            {
                text: 'Foo',
                link: '/foo/',
            },
            // NavbarGroup
            {
                text: 'notebook',
                children: [
                    {text:"vue",link:'/notebook/vue笔记.md'}, 
                    {text:"nodejs",link:'/notebook/nodejs.md'}
                ],
            },
        ],
        // sidebar:

        /* 仓库配置 */
        // 我们会将它作为一个 GitHub 仓库
        // repo: 'vuejs/vuepress',
        // 你也可以直接将它设置为一个 URL
        repo: 'https://gitlab.com/foo/bar',
        repoLabel:"Find me",
    },
}