# Software Lab Project

## Steps to run it

To run the webpage (frontend and backend):

* Create file `.env` in **/backend/** with the following information, changing `<password>` in the urls, `PORT` with the port you wish to use, and `SECRET` with a secret string:
```console
foo@bar:~$ cat softlab/backend/.env
MONGODB_URI='mongodb+srv://softlab:<password>@softlab.ds06f.mongodb.net/mmm?retryWrites=true&w=majority'
TEST_MONGODB_URI='mongodb+srv://softlab:<password>@softlab.ds06f.mongodb.net/mmmtest?retryWrites=true&w=majority'
PORT=<number>
SECRET=<string>
```

* Run the following commands from the main folder:
```console
foo@bar:~$ cd frontend
foo@bar:~$ npm install
foo@bar:~$ cd ../backend
foo@bar:~$ npm install
foo@bar:~$ npm run build:ui
foo@bar:~$ npm run dev
```