# Lab 1 - Playing around with images locally

In this lab, you'll download a ubuntu image from Docker Hub, run a ubuntu container, create some stuff in it and save your changes into a new image so you can see how easy it is to share your image with others.

1. Open your terminal window and run `docker pull ubuntu`. Docker will download the latest version from Docker Hub.

2. Run `docker images` to list your local images and see ubuntu is there.

3. Let's create and access our first container. Run the following command.
```
docker run -it --name myfirstcontainer ubuntu /bin/bash
```
>'-it' flag means that you want to run the container in iteractive mode so you get into the container instead of just running it in the terminal window.<BR>
>'--name' allows you to give a name to your container for organization purposes, you can give it any name you want to. Then we need to reference the image we created (myfirstimage in our case) and the the command we want docker to run in interactive mode.
&nbsp;&nbsp;&nbsp;Now you are in your ubuntu container, congrats!

4. Let's create a folder (or directory) and a file in your container and see how its consistency works. Run the following commands:
```
cd /home
mkdir mytestdir
cd mytestdir
touch myfile.txt
ls -l
```

&nbsp;&nbsp;&nbsp;You should be able to view your file (myfile.txt) listed in your container.

5. To show how images and containers work, let's assume you created this file as a task for building up your new container like installing something, changing some setting, etc.<BR>
Leave your container prompt by typing `exit`. You'll get back to your local machine terminal.

6. To list all your container run `docker ps -a`. You'll see your containers stopped (with Exited in the STATUS column)

7. Remove your container running `docker rm <conatiner name>` - in our case myfirstcontainer and check your containers again.<BR>You shoud see nothing there this time.

8. Let's create a container again using the same ubuntu image. Run step 3 again and then go to your `/home` and look for your directory or your file. You probably won't find them.
> All you previosly did is gone since all your changes live while you don't remove your container. This is good since if you mess up, you just have to remove and recreate your container. What if you need to save your changes to keep working on it? Hopefully there's way to do that!

9. Recreate your folder and file (Follow step 4 again) and leave the container typing `exit`.

10. Once you have it ready, let's save your changes as a new image to your local repository. Run the following:
```
docker commit myfirstcontainer myfirstimage
```
>The command above you first provide your container name (myfirstcontainer) and then the image name you want to create out of that container (myfirstimage).
11. Run `docker images` so you can see all your saved or created images. You should be able to see your brand new image!

12. To ensure your changes are all there, let's create and run a container from your new image. Run:
```
docker run -it --name mysavedimage myfirstimage /bin/bash
```

13. Once within your new container, go and check for your 'mytest' directory and your 'myfile.txt'. You should see them and now you are able to keep working on that container and save whenever you want to generating a new image.

14. Exit your container running `exit`.
