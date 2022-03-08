export const themeData = {
  "logo": "https://kwongliegaai.coding.net/p/kvoon/d/kvoonpic/git/raw/master/icon/lidog3",
  "navbar": [
    {
      "text": "Foo",
      "link": "/foo/"
    },
    {
      "text": "notebook",
      "children": [
        {
          "text": "vue",
          "link": "/notebook/vue笔记.md"
        },
        {
          "text": "nodejs",
          "link": "/notebook/nodejs.md"
        }
      ]
    }
  ],
  "repo": "https://gitlab.com/foo/bar",
  "repoLabel": "Find me",
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebar": "auto",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
