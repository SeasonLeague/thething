# The-Thing (Document Reader Web Application)

So I got newly admitted to school, since i love listening to music, I thought of the idea of creating a web app (web app since i don't do mobile apps) of converting my text to audios, so that i can listen to them. This can be useful for me cause instead of carrying books all around, I can easily just upload my documents and start listening. Well this app is basically base for me ALONE but anyone can clone and use. So this is a web-based document reader application that allows users to upload documents, convert them to speech, Listen and manage bookmarks.

## Features

- Document upload and parsing (PDF, DOCX, TXT)
- Text-to-speech conversion
- Audio playback with controls (play/pause, seek, speed)
- Bookmark management
- Dark mode support

## Install 
- Clone the repo: ```git clone [git url]```
- Rename `.env.example` to `.env`

#### Run Frontend
- ```cd thething``` 
- Install Dependencies: ```npm install --peer-legacy-deps```
- Run Frontend: ```npm run dev```

#### Run Backend 
- ```cd thething && cd backend```
- Install Dependencies: ```npm install```
- Run Backend: ```npm run dev```