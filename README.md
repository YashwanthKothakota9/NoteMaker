<div align='center'>
    <h1 align='center'>NoteMaker</h1>
    <h3>The personal note taking application.</h3>
</div>

<div align='center'>
    <a href="http://172.105.62.171/">NoteMaker</a>
</div>

<div align='center'>
    <a href="https://twitter.com/Yashcsp22"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/Yashcsp22
    "></a>
</div>

<br/>

NoteMaker is a personalized note taking app with an information of upto 500 words per note.

## Features

- **Private Notes:** Create your private notes with by creating your personal account
- **Self-hosted, open-source:** Host it yourself and hack on it

## Demo

![Notemaker Welcome GIF](.github/images/Notemaker.gif)

## Tech Stack

- [React](https://react.dev/) - Library for Frontend
- [Typescript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Node.js](https://nodejs.org/docs/latest/api/) - for Backend
- [Express](https://expressjs.com/) - Framework for Backend
- [MongoDB](https://www.mongodb.com/) - Database
- [Vite](https://vitejs.dev/) - Dev environment and bundler
- [Linode](https://www.linode.com/) - Hosting

## Getting Started

### Prerequisites

Here's what you need to be able to run NoteMaker:

- Node.js (version >= 18)
- MongoDB Database

### 1. Clone the repository

```shell
git clone https://github.com/YashwanthKothakota9/NoteMaker.git
cd NoteMaker
```

You will find two folders `backend` and `frontend`

### 2. Install npm dependencies

```shell
cd backend
npm install
```

```shell
cd frontend
npm install
```

### 3. Copy the environment variables to `.env` and change the values

```shell
cd backend
cp .env.example .env
```

copy your own `mongodb atlas` database `url`

### 5. Run the backend server

```shell
cd backend
npm start
```

### 6. Run the dev server

```shell
cd frontend
npm run dev
```

### 6. Open the app in your browser

Visit [http://localhost:8080](http://localhost:8080) in your browser.

## Contributing

NoteMaker is an open-source private note taking project and contributions are very much welcome from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
