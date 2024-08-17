# GitHub Repository Tree Viewer

## Features

- User authentication via GitHub OAuth
- Display of user's GitHub repository list (public, private, forked)
- Visualization of folder and file tree structure for selected repositories
- Tree structure sharing functionality
  - Share tree structure via compressed URL
  - Copy shared URL to clipboard

## Tech Stack

![Next.js][NextJS] ![Vercel][Vercel] ![TypeScript][TypeScript] ![Tailwind CSS][TailwindCSS]

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Authentication**: NextAuth.js (Auth.js v5)
- **Styling**: Tailwind CSS
- **Data Compression**: pako
- **API Requests**: ky
- **Deployment**: Vercel

## Related Project

[Project Tree Generator](https://woochanleee.github.io/project-tree-generator/)

## Notes

- This project uses the GitHub API to fetch repository data.
- Loading time for tree structures may be longer for large repositories.
- The maximum length of shared URLs may vary depending on browser limitations.

[Vercel]: https://img.shields.io/badge/Vercel-%23000000?style=for-the-badge&logo=vercel
[NextJS]: https://img.shields.io/badge/Next%2014.2.4-%23000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[TypeScript]: https://img.shields.io/badge/TypeScript-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TailwindCSS]: https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
