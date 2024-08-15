const n=`---\r
title: "#1 Vue3와 Vuetify 그리고 Github Pages로 블로그 만들기 - 준비물 및 간략 가이드"\r
description: Vue3와 Vuetify를 사용해 Github Pages에 블로그를 만드는 과정을 단계별로 정리한 글입니다.\r
tags: [Vue3, Vuetify, Github Pages, 블로그, 웹 개발]\r
author: emdas93\r
category: [개발, 블로그]\r
permalink: /post/vue3-vuetify-github-pages-blog\r
slug: vue3-vuetify-github-pages-blog-1\r
image: ''\r
published: true\r
created_at: 2024-07-26 10:07\r
updated_at: 2024-07-26 10:07\r
---\r
\r
# Vue3와 Vuetify, 그리고 Github Pages로 나만의 블로그 만들기\r
\r
안녕하세요.\r
\r
최근에 Vue3와 Vuetify를 공부하면서 이를 활용해 Github Pages에 블로그를 만들어보았습니다. 흔히 Github 블로그라고 하면 Jekyll이라는 정적 사이트 생성기(SSG)를 많이 떠올리실 텐데요. 저도 Jekyll을 사용해봤지만, 이번에는 제가 잘 알고 있는 언어로 블로그를 만들어 자유도를 높여보고 싶었습니다. \r
\r
또한, Vue3를 이용해 실제 프로젝트를 진행하며 배운 내용을 정리할 수 있는 좋은 기회가 될 것 같았습니다. 그래서 오늘은 Vue3와 Vuetify, 그리고 Github Pages를 이용해 블로그를 만드는 과정을 단계별로 정리해보려고 합니다.\r
\r
## 준비물\r
\r
블로그를 만들기 위해서는 다음과 같은 준비물이 필요합니다:\r
\r
- **GitHub 계정**: 블로그를 호스팅할 저장소가 필요합니다.\r
- **Node.js 및 npm**: 패키지 관리를 위해 필요합니다.\r
- **Vuetify**: Vue.js를 위한 Material Design 컴포넌트 프레임워크입니다.\r
- **Git**: 버전 관리와 GitHub Pages 배포를 위해 필요합니다.\r
\r
## 단계별 가이드\r
\r
1. **프로젝트 디렉토리 생성**\r
    - 터미널에서 새로운 프로젝트 디렉토리를 만듭니다.\r
    - \`mkdir my-blog && cd my-blog\`\r
\r
2. **Vue3 및 Vuetify 설치**\r
    - Vue3와 Vuetify를 설치하고 초기 설정을 완료합니다.\r
    - \`npm init vue@latest\`\r
    - 프로젝트 설정을 완료한 후 Vuetify를 설치합니다.\r
    - \`npm install vuetify@next\`\r
\r
3. **Vuetify 초기화**\r
    - Vuetify를 프로젝트에 추가하고 설정 파일을 생성합니다.\r
    - \`npx vuetify@next init\`\r
\r
4. **블로그 레이아웃 구성**\r
    - Vuetify 컴포넌트를 활용해 블로그 레이아웃을 구성합니다.\r
    - 헤더, 사이드바, 본문 영역을 나누어 디자인합니다.\r
\r
5. **GitHub Pages 설정**\r
    - GitHub에 새로운 저장소를 생성하고 프로젝트를 푸시합니다.\r
    - GitHub Pages를 활성화하여 저장소를 통해 블로그를 호스팅합니다.\r
\r
6. **배포**\r
    - 프로젝트를 빌드하고 GitHub Pages에 배포합니다.\r
    - \`npm run build\` 후 빌드된 파일을 GitHub Pages에 푸시합니다.\r
\r
7. **SEO를 위한 정적페이지 생성**\r
	- SSG 생성을 위한 템플릿을 작성합니다.\r
	- entry-server.js 파일을 작성합니다.\r
	- entry-client.js 파일을 작성합니다.\r
	- prerender.js 파일을 작성합니다.\r
\r
앞으로 여러 포스트를 통해 각 단계별 자세한 내용을 다룰 예정이니 많은 기대 부탁드립니다. Vue3와 Vuetify를 사용한 블로그 만들기 여정에 함께해 주세요!\r
\r
감사합니다.\r
\r
---\r
\r
## 태그\r
\r
- Vue3\r
- Vuetify\r
- Github Pages\r
- 블로그\r
- 웹 개발\r
`;export{n as default};
