CVs linked from the site (paths in src/content/profile.ts):

- En_Parisi_Marco.pdf: English CV (source: LaTeX, kept outside this repo)
- rirekisho.pdf: 履歴書 (Japanese standard résumé)
- shokumukeirekisho.pdf: 職務経歴書 (Japanese career history)
- rirekisho-shokumukeirekisho.pdf: both joined, the 応募書類 set the Japanese hero button downloads

The two Japanese PDFs are built from docs/cv/*.html (local only: docs/ is git-ignored): `node docs/cv/build.mjs docs/cv`
(needs google-chrome and network access for the IBM Plex Sans JP subset), then copy the PDFs here.
