# Lab 3 - Working with Dockerfiles
What if I tell you there's even a simpler way to create your images!?

I'm talking about Dockerfiles which allows us to actually "develop infrastructure". Using Dockerfile we can create our images in a more consistent way, store it using Git, develop it in collaboration, implement devOps and a lot more.
We are going to use a Dcokerfile I've already created to build our image and run our container.

1. Download the files (Dockerfile and app.py) from this directory into your local machine, save them in the same directory.
>This Dockerfile will create an image based on Linux Ubuntu, setup Python 2.7 and install the required libs so we can run our Python code.

>The app.py file contains a simple Python application that provides a REST endpoint (/myservice/list) so you can call it from the browser and view a json array with a list of products. We'll not go into details of the code since that's not our focus in this training.

2. Go to the directory you created and run:
```
docker build -t pyapp-image .
```
&nbsp;&nbsp;&nbsp;Docker build will create the image and name it with the '-t' flag using the file in the local folder.

3. Run `docker images` to check your image's been created.

4. Let's start our container as a deamon so it doesn't block your terminal. Run the following:
```
docker run -d --name pyapp-container -p8080:8080 pyapp-image
```
>The `-p<port from your machine>:<container port>` flag is used to publish ports from the container and make it available through your local machine. In our case we are exposing port 8080 from our container to port 8080 in our local machine. You can choose any port you want to.

5. Check your container is running using `docker ps -a`. You can also view its logs running `docker logs pyapp-container`.

6. Go to your browser and open `localhost:8080/myservice/list`. You should be able to view the json array with some products in it.
