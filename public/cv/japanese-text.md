# Japanese text: website and CVs

Generated 2026-11-27 from `messages/ja.json`, the source code and `docs/cv/*.html` (the sources of the PDFs in `public/cv/`).
Website tables show the English text next to each Japanese one, so each line can be checked for meaning. Markup such as `<br></br>`, `<time>` and `{year}` is filled in by the code (a line break, a formatted date, a number).

## Proofreading changes (2026-11-27)

Website (`messages/ja.json` and code):

| Where | Before | After | Why |
| --- | --- | --- | --- |
| Meta description | React・Next.jsとWebパフォーマンスで4年の経験を持つ… | ラグジュアリーブランドやEC企業向けのWeb開発に4年間携わってきた…（React・Next.js、Webパフォーマンス） | "4 years of experience in React and performance" was an unnatural construction |
| Hero intro | ECサイト向けに | EC企業向けに | apps are built for companies (brands), not for websites |
| Scrolling band buttons | 流れる帯を一時停止 / 再生 | 帯の動きを一時停止 / 再開 | "再生" means play back media; "再開" means resume |
| Eyewear card | 修正として / 基準値をクリアし / 沿って対応 | 修正依頼として / 基準値を満たしており / 沿って順次対応 | "fix requests"; "pass the thresholds" in written style; the open fixes are still to come |
| Performance-report card | あらゆるサイト / LLMが分析を書き | 任意のサイト / LLMが作成し | "any site" in the technical sense; 書く is too casual for a tool |
| Ticketing card | その裏側のバックエンドと管理画面で、イベントと販売を管理 | イベントと販売は、その裏側で動くバックエンドと管理画面で管理 | the original read as a fragment |
| Stack, front end | Storybookで文書化した | Storybookでドキュメント化した | the usual term in software |
| Stack, ways of working | アジャイルチームで、Figma… | アジャイルチームで進め、Figma… | the sentence had no verb |
| Experience intro | 海外ブランド / Webパフォーマンスが専門 | 国際的なブランド / Webパフォーマンスを専門に担当 | "海外" means "foreign" to a Japanese reader; the second was a fragment |
| Experience bullets | 大手国際アイウェアブランド / 作成・レビュー時に使用 / レストエリア | 世界的な大手アイウェアブランド / 作成・レビューする際に活用 / 休憩施設（レストエリア） | natural word order; "レストエリア" alone is not a Japanese term |
| Japan, certification note | 学歴要件の特例対象 | 学歴要件に代わる資格 | the same meaning as the English "replaces the degree requirement" |
| Date ranges (timeline, years) | 2026年7月 — 2026年12月 · 2023–25年 | 2026年7月〜2026年12月 · 2023〜25年 | Japanese uses 〜 for ranges, not a dash |
| Project role line | 担当 — WEBパフォーマンスアナリスト | 担当：Webパフォーマンスアナリスト | Japanese punctuation; the uppercase style turned "Web" into "WEB" (titles in Japanese now keep their case) |

CVs (`docs/cv/*.html`, rebuilt into `public/cv/`): 欧州の公認プログラムを2つ修了して → 欧州の公認プログラム2つで · 東京に在住し → 東京に移住し (a future move) · 大手国際アイウェアブランド → 世界的な大手アイウェアブランド · the Core Web Vitals and agent-skills bullets rewritten as full clauses · レストエリア → 休憩施設（レストエリア） · 社会協同組合 → 社会的協同組合 (the Japanese term for an Italian cooperativa sociale) · 履歴書: 東京に在住いたします → 東京に居住予定です.

Still worth a native speaker's read before sending the CVs to employers.

## 1. Website, Japanese page (/jp)

### Page title and description (browser tab, search results, link previews)

| Key | Japanese | English |
| --- | --- | --- |
| `title` | マルコ・パリージ｜東京のフルスタックエンジニア（React・Next.js） | Marco Parisi, Full-Stack Engineer in Tokyo (React, Next.js) |
| `description` | ラグジュアリーブランドやEC企業向けのWeb開発に4年間携わってきたフルスタックエンジニア（React・Next.js、Webパフォーマンス）。2026年12月から東京在住、フルタイムでの就業を希望。 | Full-stack engineer with 4 years of React, Next.js and web performance for luxury and e-commerce brands. In Tokyo from December 2026, open to full-time roles. |

### Header and menu

| Key | Japanese | English |
| --- | --- | --- |
| `skipToContent` | 本文へスキップ | Skip to content |
| `navLabel` | メイン | Main |
| `nav.work` | 実績 | Work |
| `nav.stack` | 技術スタック | Stack |
| `nav.experience` | 経歴 | Experience |
| `nav.japan` | 日本での就労 | Japan |
| `nav.contact` | 連絡先 | Contact |
| `menu.title` | メニュー | Menu |
| `menu.open` | メニューを開く | Open menu |
| `menu.close` | メニューを閉じる | Close menu |
| `clocks.torino` | トリノ | Torino |
| `clocks.tokyo` | 東京 | Tokyo |
| `localeSwitch` | English | 日本語 |
| `themeToggle.toLight` | ライトテーマに切り替える | Switch to light theme |
| `themeToggle.toDark` | ダークテーマに切り替える | Switch to dark theme |

### 01. Hero

| Key | Japanese | English |
| --- | --- | --- |
| `title` | フルスタック<br></br>エンジニア | Full-Stack <br></br>Engineer |
| `subtitle` | 日本での<br></br>フルタイム就業を希望 | Open to full-time <br></br>roles in Japan |
| `availability` | <time>{date}</time>から東京在住 | In Tokyo from <time>{date}</time> |
| `intro` | ラグジュアリーブランドやEC企業向けに、主にReact・Next.jsでWebアプリを4年間開発し、現在はWebパフォーマンスを専門としています。2026年12月から東京で日本語を学びながら、日本で長くキャリアを築けるフルタイムの仕事を探しています。 | Four years building web apps for luxury and e-commerce brands, mostly in React and Next.js, and now focused on web performance. In Tokyo from December 2026 to study Japanese, and looking for a full-time role to build a long-term career in Japan. |
| `ctaWork` | 実績を見る | View work |
| `ctaCv` | 応募書類 | Download CV |
| `ctaCvShort` | 応募書類 | CV |
| `emblemAlt` | ドットで描いた夜の東京タワー | Tokyo Tower at night, drawn as a field of dots |

### Scrolling band (buttons)

| Key | Japanese | English |
| --- | --- | --- |
| `pause` | 帯の動きを一時停止 | Pause the scrolling band |
| `play` | 帯の動きを再開 | Play the scrolling band |

### 02. Work (制作実績)

| Key | Japanese | English |
| --- | --- | --- |
| `number` | 02. | 02. |
| `title` | 制作実績 | Selected work |
| `subtitle` | 2023〜2026年のクライアント案件と個人開発ツール。 | Client projects and a personal tool, 2023–2026. |
| `role` | 担当：{role} | Role — {role} |
| `code` | コード | Code |
| `live` | 公開サイト | Live |
| `caseStudy` | 事例を見る | Case study |
| `private` | 非公開 | Private |
| `counter` | 全{total}件中{index}件目 | Project {index} of {total} |
| `stackLabel` | 使用技術 | Built with |
| `carousel` | カルーセル | carousel |
| `slide` | スライド | slide |
| `slideLabel` | {total}件中{index}件目 | {index} of {total} |
| `trackLabel` | プロジェクト | Projects |
| `listLabel` | プロジェクトを選ぶ | Jump to a project |
| `previous` | 前へ | Previous |
| `next` | 次へ | Next |
| `previousLabel` | 前のプロジェクト | Previous project |
| `nextLabel` | 次のプロジェクト | Next project |
| `projects.eyewear.title` | アイウェアECのWebパフォーマンス | Eyewear web performance |
| `projects.eyewear.description` | グローバルなアイウェアブランドのECサイトでWebパフォーマンスを担当。WebPageTest・Grafana・Contentsquare・Core Web Vitalsのフィールドデータを組み合わせて監査し、見つかった課題は、優先度とリリース予定を付けた修正依頼として開発チームに共有。各サイトのCore Web VitalsはGoogleの基準値を満たしており、未対応の修正はアプリケーション保守チームに引き継いだリリース計画に沿って順次対応。 | Web performance for the online stores of a global eyewear brand. Audits combine WebPageTest, Grafana, Contentsquare and Core Web Vitals field data, and each problem found reaches the development teams as a prioritised fix with a planned release. Core Web Vitals on the sites pass Google's thresholds, and the fixes still open follow a release plan handed over to the application maintenance team. |
| `projects.eyewear.role` | Webパフォーマンスアナリスト、{year}年 | Web performance analyst, {year} |
| `projects.ai.title` | AIを活用したパフォーマンスレポート | AI-assisted performance reports |
| `projects.ai.description` | 「Performance-report」は、任意のサイトのWebパフォーマンスを監査し、結果をPDFレポートで解説するPythonツール。ヘッドレスChromiumでデバイス・回線条件ごとにCore Web Vitalsを計測し、Grafanaの実ユーザーデータをラボでの計測結果に追加。分析は厳選したWebパフォーマンスの知識ベースに基づいてLLMが作成し、レポートは毎回同じ構成で出力。アイウェア案件から生まれたツールで、仕様書をもとにAIコーディングエージェントが開発し、テストはGitHub Actionsで実行。 | Performance-report is a Python tool that audits the web performance of any site and explains the results in a PDF report. Headless Chromium measures Core Web Vitals across device and network profiles, and real-user data from Grafana is added to the lab results. An LLM grounded in a curated performance knowledge base writes the analysis, in a report whose structure stays the same from run to run. The tool came out of the eyewear work and was built by AI coding agents from written specs, with tests running on GitHub Actions. |
| `projects.ai.role` | 個人開発、{year}年 | Personal project, {year} |
| `projects.fashion.title` | ラグジュアリーファッションEC | Luxury fashion e-commerce |
| `projects.fashion.description` | イタリアのラグジュアリーファッションブランド2社のWebサイト・ECサイトでフロントエンドを開発。Storybookの共通コンポーネントライブラリをもとに新しいサイトセクションを構築し、データはGraphQL APIから取得。 | Front-end development for the websites and online stores of two Italian luxury fashion brands. New site sections were built on a shared component library in Storybook, with their data read from GraphQL APIs. |
| `projects.fashion.role` | フロントエンドエンジニア、{year}年 | Frontend engineer, {year} |
| `projects.appliances.title` | 家電ECサイト | Home-appliance e-commerce |
| `projects.appliances.description` | 家電ブランドのECサイトで、買い物客が次に開きそうなページをSpeculation Rules APIでプリフェッチ・プリレンダリングし、ページ表示を高速化。商品一覧・商品詳細ページを再構築し、Google Analyticsで計測するA/Bテスト用コンポーネントを追加。別の家電ブランドのECサイトでは、ドイツ・スペインのチームと共同でフロントエンドを開発。 | Faster page loads for the online store of a home-appliance brand, using the Speculation Rules API to prefetch and prerender the page a shopper is likely to open next. The product listing and product detail pages were rebuilt, with A/B-test components tracked in Google Analytics. On a second appliance brand's store, the front end was developed together with teams in Germany and Spain. |
| `projects.appliances.role` | フロントエンドエンジニア、{year}年 | Frontend engineer, {year} |
| `projects.ticketing.title` | イベントチケット販売​プラットフォーム | Event ticketing platform |
| `projects.ticketing.description` | イベントチケット販売プラットフォームを、設計からリリースまでフルスタックで開発。公開サイトではイベントの閲覧とチケット購入ができ、安全な決済ゲートウェイと連携。イベントと販売は、その裏側で動くバックエンドと管理画面で管理。 | An event ticketing platform built full stack, from design to release. Visitors browse events and buy tickets on the public site, which connects to a secure payment gateway, and the back end and back office behind it manage the events and sales. |
| `projects.ticketing.role` | Webエンジニア、{year}年 | Web engineer, {year} |

### 03. Stack (技術スタック)

| Key | Japanese | English |
| --- | --- | --- |
| `number` | 03. | 03. |
| `title` | 技術スタック | Stack |
| `subtitle` | クライアントワークと個人開発で日々使っている技術。 | Tools used day to day, in client work and personal projects. |
| `groups.frontend.title` | フロントエンド | Frontend |
| `groups.frontend.description` | TypeScriptとReact・Next.jsによるフロントエンド開発。状態管理はReduxやTanStack。UIはStorybookでドキュメント化した再利用可能なコンポーネントで構築し、スタイリングにはTailwind CSS・SCSSのほか、MUI・shadcn・RadixなどのUIライブラリも使用。 | Front ends are written in TypeScript with React and Next.js, with application state in Redux or TanStack. Interfaces are built from reusable components documented in Storybook, styled with Tailwind CSS or SCSS, or with libraries such as MUI, shadcn and Radix. |
| `groups.backend.title` | バックエンド | Backend |
| `groups.backend.description` | サーバー側はNode.js（NestJS・Express）で、REST APIや外部サービスと連携するマイクロサービスを開発。サービスはDockerでコンテナ化し、Linux上で運用、Grafanaで監視。 | Server code is written for Node.js with NestJS or Express, as REST APIs or as microservices that connect to external services. Services are packaged with Docker, run on Linux and are monitored in Grafana. |
| `groups.data.title` | データ・API | Data & APIs |
| `groups.data.description` | REST APIの構築と、フロントエンドへのGraphQL API連携。データはSQLデータベース・SQLite・MongoDBに保存し、PrismaやTypeORMでモデリング。 | APIs are built as REST, and GraphQL APIs are integrated into front ends. Data is stored in SQL databases, SQLite or MongoDB, and modelled through Prisma or TypeORM. |
| `groups.performance.title` | Webパフォーマンス | Web performance |
| `groups.performance.description` | 2026年7月からの主な専門領域。Chrome DevToolsとWebPageTestによるラボでの監査から、mPulse・Grafana・Contentsquareの実ユーザーデータまでを扱い、分析結果を優先度付きの修正と新機能のパフォーマンスバジェットに反映。 | Web performance has been the main focus since July 2026, from lab audits in Chrome DevTools and WebPageTest to real-user data in mPulse, Grafana and Contentsquare. Findings become prioritised fixes and performance budgets for new features. |
| `groups.ways.title` | 開発の進め方 | Ways of working |
| `groups.ways.description` | クライアントワークは国際的なアジャイルチームで進め、Figmaのデザインをもとに、JiraとConfluenceで計画・管理。個人開発ではClaudeなどのAIエージェントが仕様書から実装し、Gitでバージョン管理、GitHub Actionsでテスト。 | Client work runs in international Agile teams, planned in Jira and Confluence from Figma designs. Personal projects are coded by AI agents such as Claude from written specs, versioned in Git and tested on GitHub Actions. |

### 04. Experience (経歴)

| Key | Japanese | English |
| --- | --- | --- |
| `number` | 04. | 04. |
| `title` | 経歴 | Experience |
| `subtitle` | 詳しい職務経歴は、下の<ja>職務経歴書</ja>に記載。 | A detailed career history (<ja>職務経歴書</ja>) is in the documents below. |
| `range` | <from></from>〜<to></to> | <from></from> — <to></to> |
| `now` | 現在 | now |
| `intro` | トリノの公認プログラム2つでソフトウェア開発を学び直し、2023年からWeb開発に従事。最初は一般向けのポータルサイトやバックエンドを開発し、2025年からは国際的なブランドのECサイトのフロントエンドを担当。2026年7月からはWebパフォーマンスを専門に担当。 | Web development since 2023, after retraining in software through two accredited programs in Turin. The first projects were public portals and back ends. E-commerce front ends for international brands followed in 2025, and web performance became the focus in July 2026. |
| `workLabel` | 職歴 | Work |
| `educationLabel` | 学歴・資格 | Education and certification |
| `work.performance.title` | Webパフォーマンスアナリスト | Web Performance Analyst |
| `work.performance.org` | Rextart（Reply社のプロジェクトに参画） | Rextart, for Reply |
| `work.performance.bullets.0` | 世界的な大手アイウェアブランドの各Webサイトを、WebPageTest・Grafana・Contentsquare・Core Web Vitalsのフィールドデータで監視・監査。分析結果は優先度付きのチケットとして開発チームに提供。 | Monitoring and auditing the websites of an international eyewear brand with WebPageTest, Grafana, Contentsquare and Core Web Vitals field data. Findings go to the development teams as prioritised tickets. |
| `work.performance.bullets.1` | 新機能の企画段階でパフォーマンス要件を定義。開発チーム・クライアントとの定例会議を主導し、Core Web VitalsについてGoogleと直接連携。 | Performance requirements are set when a new feature is planned. Recurring performance meetings with the development teams and the client, and direct contact with Google on Core Web Vitals. |
| `work.performance.bullets.2` | AIコーディングエージェント向けのエージェントスキルを作成。Next.js、アクセシビリティ、セマンティックHTML、CSS、GEO、Webパフォーマンスのルールとレビュー用チェックリストをまとめ、エージェントがコードを作成・レビューする際に活用。 | Agent skills for AI coding agents, with rules and review checklists for Next.js, accessibility, semantic HTML, CSS, GEO and web performance. Agents use them when they write or review code. |
| `work.frontend.title` | フロントエンドエンジニア | Frontend Engineer |
| `work.frontend.org` | Rextart（Reply社のプロジェクトに参画） | Rextart, for Reply |
| `work.frontend.bullets.0` | ラグジュアリーファッションブランド2社のフロントエンド機能とGraphQL連携を開発。新しいサイトセクションとStorybookの共通コンポーネントライブラリを含む。 | Front-end features and GraphQL integration for two luxury fashion brands, including new site sections and a shared component library in Storybook. |
| `work.frontend.bullets.1` | 家電ブランドのECサイトにSpeculation Rules APIを導入し、ページ表示を高速化。商品一覧・商品詳細ページの再構築とA/Bテスト用コンポーネントも担当。 | Faster page loads on a home appliance e-commerce site with the Speculation Rules API, along with rebuilt product listing and product detail pages and A/B test components. |
| `work.frontend.bullets.2` | Reply社のドイツ・スペインのチームと協働し、別のECサイトのフロントエンドを開発。 | Front-end development of another e-commerce site, with Reply teams in Germany and Spain. |
| `work.synesthesia.title` | Webエンジニア | Web Engineer |
| `work.synesthesia.org` | Synesthesia | Synesthesia |
| `work.synesthesia.bullets.0` | イベントのチケット販売ポータルを、管理画面から公開サイトまでフルスタックで開発。決済ゲートウェイを統合。 | An event ticketing portal built full stack, from the back office to the public site, with a payment gateway. |
| `work.synesthesia.bullets.1` | イタリアのある州都向けに、地域ニュース・イベント・行政サービスを掲載する地域情報プラットフォームを構築。 | A city information platform for an Italian regional capital, with local news, events and public services. |
| `work.synesthesia.bullets.2` | 外部XMLサービスと連携し、Grafanaで監視するカート・販売・クーポン割引のマイクロサービスを構築。休憩施設（レストエリア）管理用の予約システムのバックエンドも開発。 | Microservices for cart, sales and discount coupons, connected to external XML services and monitored in Grafana. Also the back end of a reservations system for rest-area management. |
| `education.fe.title` | 基本情報技術者試験（FE）合格 | Fundamental IT Engineer Examination (FE) |
| `education.fe.org` | ITPEC（PhilNITS） | ITPEC (PhilNITS) |
| `education.fe.bullets.0` | 日本のIPA（情報処理推進機構）との相互認証に基づき、PhilNITS（フィリピン）が実施するITPEC版の基本情報技術者試験。 | The ITPEC edition of Japan's national Fundamental Information Technology Engineer Examination (<ja>基本情報技術者試験</ja>), set by PhilNITS (Philippines) under a mutual recognition agreement with Japan's IPA. |
| `education.its.title` | ソフトウェアシステム開発課程（ディプロマ） | Diploma, Software Systems Development |
| `education.its.org` | ITS Foundation for ICT（トリノ） | ITS Foundation for ICT, Turin |
| `education.its.bullets.0` | 成績 100/100。 | Final grade 100/100. |
| `education.enaip.title` | マルチメディア＆Webデザイン課程 | Multimedia and Web Design |
| `education.enaip.org` | ENAIP（トリノ） | ENAIP, Turin |
| `education.enaip.bullets.0` | 成績 88/100。 | Final grade 88/100. |

### 05. Working in Japan (日本での就労について)

| Key | Japanese | English |
| --- | --- | --- |
| `number` | 05. | 05. |
| `title` | 日本での就労について | Working in Japan |
| `subtitle` | Working in Japan | 日本での就労について |
| `facts.residence.label` | 在留資格 | Residence status |
| `facts.residence.value` | 留学 | Student visa |
| `facts.japanese.label` | 日本語 | Japanese |
| `facts.japanese.value` | 初級 | Beginner |
| `facts.japanese.note` | 東京の日本語学校で学習中 | Studying at a language school in Tokyo |
| `facts.languages.label` | その他の言語 | Other languages |
| `facts.languages.value` | イタリア語・英語 | Italian, English |
| `facts.languages.note` | ネイティブ・C1（IELTS） | Native · C1 (IELTS) |
| `facts.inTokyo.label` | 東京へ移住 | In Tokyo from |
| `facts.inTokyo.note` | トリノから | Moving from Torino |
| `facts.certification.label` | 資格 | Certification |
| `facts.certification.value` | 基本情報（FE） | Fundamental IT Engineer |
| `facts.certification.note` | 2026年4月合格・IT職の就労ビザで学歴要件に代わる資格 | FE, Apr 2026 · Replaces the degree requirement for the Engineer visa in IT roles |
| `facts.lookingFor.label` | 希望 | Looking for |
| `facts.lookingFor.value` | フルタイム | Full-time role |
| `facts.lookingFor.note` | 東京で出社またはハイブリッド | On-site or hybrid, Tokyo |
| `documents.title` | 応募書類 | Download CV |
| `documents.rirekisho.title` | 履歴書 | 履歴書 |
| `documents.rirekisho.description` | 日本語 | Japanese résumé form |
| `documents.shokumukeirekisho.title` | 職務経歴書 | 職務経歴書 |
| `documents.shokumukeirekisho.description` | 日本語 | Japanese career history |
| `documents.en.title` | 英文レジュメ | Résumé |
| `documents.en.description` | 英語 | CV in English |

### 06. Contact (連絡先)

| Key | Japanese | English |
| --- | --- | --- |
| `number` | 06. | 06. |
| `title` | 連絡先 | Contact |
| `intro` | ご連絡はメールでお願いいたします。英語・日本語のどちらでも構いません。 | Email is the quickest way to get in touch. Messages in English or Japanese are welcome. |
| `copyEmail` | メールをコピー | Copy email |
| `copied` | コピーしました | Copied |
| `copyFailed` | コピーできませんでした | Copy failed |

### Footer

| Key | Japanese | English |
| --- | --- | --- |
| `copyright` | © {year} | © {year} |
| `switchLocale` | View in English | 日本語で見る |
| `backToTop` | トップへ戻る | Back to top |

### 404 page

| Key | Japanese | English |
| --- | --- | --- |
| `title` | ページが見つかりません | Page not found |
| `body` | このページは存在しないか、移動しました。 | This page doesn't exist or has moved. |
| `back` | ホームに戻る | Back to home |

### Text written by the code (not in ja.json)

| Where | Japanese | English |
| --- | --- | --- |
| Name (footer, hero label, structured data) | マルコ・パリージ | Marco Parisi |
| Hero label | 01. マルコ・パリージ | 01. Marco Parisi |
| Scrolling band | Webパフォーマンス / フロントエンド / Eコマース / フルスタック | Web performance / Front end / E-commerce / Full stack |
| Dates (hero, Japan section) | 2026年12月 | December 2026 / Dec 2026 |
| Experience range | 2020〜2026 | 2020 — 2026 |
| Timeline periods | 2026年7月〜2026年12月 · 2025年4月〜2026年6月 · 2023年2月〜2025年3月 · 2026年4月 · 2021〜2023 · 2020〜2021 | Jul 2026 — Dec 2026 · … |
| Project card years | 2026年 · 2025〜26年 · 2023〜25年 | 2026 · 2025–26 · 2023–25 |
| Link preview image (OG) | マルコ・パリージ / 2026年12月から東京在住 / フルスタック エンジニア / 日本でのフルタイム就業を希望 | Marco Parisi / In Tokyo from December 2026 / Full-Stack Engineer / Open to full-time roles in Japan |
| Link preview image, alt text | マルコ・パリージ、フルスタックエンジニア。2026年12月から東京在住。 | Marco Parisi, Full-Stack Engineer. In Tokyo from December 2026. |
| Error page (both languages) | エラーが発生しました · 再試行 · エラー (tab title) | Something went wrong · Try again · Error |

## 2. Japanese on the English page (/en)

| Key | Text |
| --- | --- |
| `header.localeSwitch` | 日本語 |
| `experience.subtitle` | A detailed career history (<ja>職務経歴書</ja>) is in the documents below. |
| `experience.education.fe.bullets.0` | The ITPEC edition of Japan's national Fundamental Information Technology Engineer Examination (<ja>基本情報技術者試験</ja>), set by PhilNITS (Philippines) under a mutual recognition agreement with Japan's IPA. |
| `japan.subtitle` | 日本での就労について |
| `japan.documents.rirekisho.title` | 履歴書 |
| `japan.documents.shokumukeirekisho.title` | 職務経歴書 |
| `footer.switchLocale` | 日本語で見る |
| Footer (code) | マルコ・パリージ |
| Error page (code) | エラーが発生しました · 再試行 |

## 3. 履歴書 (rirekisho.pdf)

### 履歴書

2026年11月27日現在

- **ふりがな**: パリージ マルコ
- **氏名**: PARISI Marco
- **国籍**: イタリア
- **現住所**: イタリア・トリノ（2026年12月より東京都に転居予定）
- **E-mail**: marco.parisi.web@gmail.com
- 年 · 月 · 学歴・職歴
- 学歴
- 2020 · ENAIP（トリノ）マルチメディア＆Webデザイン課程 入学
- 2021 · ENAIP（トリノ）マルチメディア＆Webデザイン課程 修了
- 2021 · ITS Foundation for ICT（トリノ）ソフトウェアシステム開発課程 入学
- 2023 · ITS Foundation for ICT（トリノ）ソフトウェアシステム開発課程 修了（ディプロマ取得）
- 職歴
- 2023 · 2 · Synesthesia 入社（Webエンジニア）
- 2025 · 3 · Synesthesia 退社
- 2025 · 4 · Rextart 入社（フロントエンドエンジニア、Reply社のプロジェクトに参画）
- 2026 · 7 · Webパフォーマンスアナリストに職種変更
- 2026 · 12 · Rextart 退社予定
- 以上
- 年 · 月 · 免許・資格
- 2018 · IELTS（CEFR C1レベル）取得
- 2026 · 4 · 基本情報技術者試験（FE）合格（ITPEC／PhilNITS実施）
- 以上
- 志望の動機、特技、好きな学科、アピールポイントなど
フロントエンドとWebパフォーマンスを専門に、約4年間、国際的なラグジュアリーブランドやEコマース企業のWebサイト開発に携わってきました。計測データをもとに改善の優先順位を決め、開発チームと協力して表示速度を高めることを得意としています。

日本で長期的にキャリアを築くことを目標に、2026年12月から東京の日本語学校で学びます。日本語の学習を続けながら、フルタイムの社員として長く貢献し、成長していきたいと考えています。

語学：イタリア語（ネイティブ）、英語（ビジネスレベル）、日本語（初級・学習中）

- 本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）
2026年12月より東京に居住予定です（在留資格：留学）。

フルタイムでの勤務を希望いたします。勤務地は東京（出社またはハイブリッド）を希望いたします。

## 4. 職務経歴書 (shokumukeirekisho.pdf)

### 職務経歴書

2026年11月27日現在

氏名 マルコ・パリージ（Marco Parisi）

E-mail：marco.parisi.web@gmail.com / GitHub：github.com/Philofobia ／ LinkedIn：linkedin.com/in/marco-parisi-webdev

#### ■ 職務要約

主にReact／Next.jsを用いて、TypeScriptによるWebアプリケーション開発に約4年間従事し、現在はWebパフォーマンスを専門としております。コンサルティング企業のチームの一員として、国際的なラグジュアリーブランドやEコマース企業の高トラフィックなWebサイトを開発してきました。欧州の公認プログラム2つでソフトウェア開発を学び直し、エンジニアに転身しました。

2026年12月より日本語学習のため東京に移住し（在留資格：留学）、日本での長期的なキャリア形成を目指しています。フルタイムで長く活躍できる企業を探しております。

#### ■ 活かせる経験・知識・技術

- React／Next.jsを用いたフロントエンド開発（Storybookによる共通コンポーネントライブラリを含む）
- Core Web Vitalsを中心としたWebパフォーマンスの計測・分析・改善、パフォーマンスバジェットの策定
- NestJS／ExpressによるバックエンドおよびAPI開発（REST、GraphQL）
- ドイツ・スペインの分散チームとの共同開発

#### ■ 職務経歴

- 会社名 · Rextart（Reply社のプロジェクトに参画）
- 在籍期間 · 2025年4月～2026年12月（予定）
Webパフォーマンスアナリスト · 2026年7月～2026年12月（予定）

担当：世界的な大手アイウェアブランドのWebサイト

- WebPageTest、Grafana、Contentsquare、Core Web Vitalsのフィールドデータを用いてサイトの状態を監視・監査し、分析結果を優先度付きの具体的なチケットとして開発チームに提供
- 新機能のプロジェクト開始時にパフォーマンス要件を定義し、リリース後に対応するのではなく、実装前にパフォーマンスバジェットを設定
- 開発チームおよびクライアントの関係者との定例パフォーマンス会議を主導し、Core Web Vitalsの戦略についてGoogleと直接連携
- 各サイトのCore Web VitalsはGoogleの基準値を満たしており、未対応の修正はアプリケーション保守チームに引き継いだリリース計画に沿って順次対応
- AIコーディングエージェント向けのエージェントスキル（Next.js、アクセシビリティ、セマンティックHTML、CSS、GEO、Webパフォーマンスのルールとレビュー用チェックリスト）を作成し、エージェントがコードを作成・レビューする際に活用
フロントエンドエンジニア · 2025年4月～2026年6月

- ラグジュアリーファッションブランドMonclerおよびPradaのWeb／Eコマースプロジェクトにおいて、フロントエンド機能とGraphQL APIを開発（新規サイトセクション、Storybookによる共通コンポーネントライブラリを含む）
- BekoのEコマースプラットフォームにSpeculation Rules API（プリフェッチ／プリレンダリング）を導入し、ページ表示を高速化。あわせて商品一覧ページ（PLP）と商品詳細ページ（PDP）を再構築し、Google Analyticsによる計測付きのA/Bテスト用コンポーネントを追加
- Reply GermanyおよびReply Spainの分散チームと協働し、VorwerkのEコマースサイトのフロントエンドを開発
- 会社名 · Synesthesia
- 在籍期間 · 2023年2月～2025年3月
Webエンジニア · 2023年2月～2025年3月

- イベントの閲覧とチケット購入ができるチケット販売ポータルを設計・リリース（安全な決済ゲートウェイを統合）
- イタリアのある州都向けに、地域情報プラットフォームを構築（地域ニュース、イベント、行政サービス、住民・観光客向けの情報）
- SOLID原則に基づくマイクロサービス（カート、販売、動的クーポン割引）を構築し、外部のXMLサービスと連携、Grafanaで監視
- 休憩施設（レストエリア）管理のための社内予約システムのバックエンドを開発

#### ■ プロジェクト

##### Performance-report（個人プロジェクト、2026年）

GitHub：github.com/Philofobia/performance-report

- Webパフォーマンス監査を自動化するPythonパイプラインを構築。Chromiumによる計測で、デバイスとネットワーク条件の組み合わせごとにCore Web Vitalsを測定し、正規化してSQLiteに保存
- 厳選したパフォーマンス改善の手引き（プレイブック）を検索・参照するLLMレイヤー（RAG）を設計し、構成が固定されたPDFレポートを出力。構成のずれは自動チェックで検出
- AIコーディングエージェントとMCPツール（Claude）を活用してエンドツーエンドで実装。オフラインテスト812件、カバレッジとセキュリティのチェックを含むCIを整備

#### ■ テクニカルスキル

- プログラミング言語 · 上級：JavaScript、TypeScript、HTML、CSS／SCSS 中級：Python
- フレームワーク等 · React、Next.js、NestJS、Express、Redux、TanStack、Tailwind、MUI、shadcn、Radix
- データ・API · SQL、NoSQL（MongoDB）、Prisma、TypeORM、REST、GraphQL
- ツール · Linux、Docker、Git、Claude、Jira、Teams、Slack

#### ■ 資格

2026年4月 基本情報技術者試験（FE）合格（ITPEC／PhilNITS実施）

※ 日本の基本情報技術者試験に相当し、在留資格「技術・人文知識・国際業務」の学歴・実務経験要件が免除される試験の一つです。

#### ■ 語学

- 英語 · ビジネスレベル（CEFR C1、IELTS 2018年）
- イタリア語 · ネイティブ
- 日本語 · 初級（現在学習中）

#### ■ 講師・地域活動の経験

SYX（トリノ） 講師 · 2023年

講座「自分だけのプラットフォームゲームを作ろう」「PythonとRen'Pyでビジュアルノベルを作ろう」を担当

社会的協同組合 Il Margine（トリノ） 音楽ラボ講師 · 2015年～2016年

音楽制作ワークショップを企画・担当し、Logic Proなどの音楽制作ソフトの使い方を指導

#### ■ 学歴

- 2021年～2023年 · ITS Foundation for ICT（トリノ、2年制の高等技術教育機関）ソフトウェアシステム開発課程 ディプロマ取得（100/100）
- 2020年～2021年 · ENAIP（トリノ、職業訓練機関）マルチメディア＆Webデザイン課程 修了（88/100）

#### ■ 自己PR

Webパフォーマンスの改善を強みとしています。プロジェクト開始時にパフォーマンスバジェットを設定し、計測データをもとに改善項目に優先順位を付け、開発チームがすぐに着手できる形で提案してきました。

また、ドイツ・スペインのチームとの共同開発や講師の経験を通じて、異なる背景を持つメンバーにも分かりやすく情報を共有することを大切にしています。日本で長く働くことを目標に、日本語の学習を続けています。

以上

`rirekisho-shokumukeirekisho.pdf` (応募書類) is the two documents above joined, 履歴書 first.
