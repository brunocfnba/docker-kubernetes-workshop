# Lab 2 - Downloading and running an image from Docker Hub
The target of this lab is to teach you how to look for a specific image in Docker Hub, download and run it locally.

1. Go to [https://hub.docker.com](https://hub.docker.com/), create an account (it's free) if you want to. Look for 'brunocf', it'll bring all images from that owner and then look for the 'brunocf/counter' image. Click on it to check how to download it (basically run `docker pull brunocf/counter`). Download it.

2. Run `docker images` to check your new image is there.

3. Let's run the image you've just downloaded by running the following command:
```
docker run --name mycounter brunocf/counter
```
&nbsp;&nbsp;&nbsp;It should start printing some messages on your terminal (something like 'Script ran 1 times - Sun Sep 17 18:55:58 UTC 2017')
> The brunocf/counter container is for learning purpose only, it's a simple shell script that runs an eternal loop and prints how many times it's run since it started and the timestamp at the moment.

4. Open a new terminal window and run `docker ps -a` so you can see your container is running.
&nbsp;&nbsp;&nbsp;That's great but everything is running on your terminal, that's definitely not the best way to run critical things in your container so let's stop and remove this one.

5. In your terminal (the same window you checked the container status), run `docker stop mycounter` and check if it exited running `docker ps -a`. If that's stopped, run `docker rm mycounter` to get rid of it. When chekcing your container you should see nothing there since we have no containers anymore.

6. Let's make things right now and run this container as a deamon process so it doesn't lock your terminal when outputting to screen. All you have to do is add the `-d` flag to you docker run command like so:
```
docker run -d --name mycounter brunocf/counter
```
When you hit enter, the command should return the container id and then you can check the container is running using `docker ps -a`.

7. To check the container output you need to check its logs simply running `docker logs <container name>` - in our case mycounter. Everything should be working fine and you have setup your first container using an image from Docker Hub and is able to let it run in the background like a production system runs!

8. If you want to, clean up your environment for the comming labs by stopping your container, removing it and removing the downloaded image running `docker rmi <image name>` - you can also use the first 3 characters from the image id.
