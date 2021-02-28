# Software Lab Project

## Steps to run it

To run the webpage (frontend and backend):

* Create file `.env` in **/backend/** with the following information, changing `<password>` in the urls, `PORT` with the port you wish to use, `SECRET` with a secret string, and `EXPIRINGTIME` with the time that the TOKEN is valid:
```console
foo@bar:~$ cat softlab/backend/.env
MONGODB_URI='mongodb+srv://softlab:<password>@softlab.ds06f.mongodb.net/mmm?retryWrites=true&w=majority'
TEST_MONGODB_URI='mongodb+srv://softlab:<password>@softlab.ds06f.mongodb.net/mmmtest?retryWrites=true&w=majority'
PORT=<number>
SECRET=<string>
EXPIRINGTIME=<number>
```

* Run the following commands from the main folder (if you are in **Unix**):
```console
foo@bar:~$ cd frontend
foo@bar:~$ npm install
foo@bar:~$ cd ../backend
foo@bar:~$ npm install
foo@bar:~$ npm run ini
```
If you are using **Windows** instead of executing `npm run ini` you have to run `npm run ini`.