# Docker and Kubernetes Workshop

This GitHub repo have all the material needed to get hands on with Docker and Kubernetes basics.

### Step by Step Lab Guide

_Before starting with the labs, make sure you've been through the "Lab Setup Guide.pdf" file in this repo._

---
#### Lab I - Playing around with images locally

In this lab, you'll download a ubuntu image from Docker Hub, run a ubuntu container, create some stuff in it and save your changes into a new image so you can see how easy it is to share your image with others.

1. Open your terminal window and run `docker pull ubuntu`. Docker will download the latest version from Docker Hub.
2. Run `docker image` to list your local images and see ubuntu is there.
3. Let's create and access our first container. Run the following command.
```
docker run -it --name myfirstcontainer ubuntu /bin/bash
```
Now you are in your ubuntu container congrats!

4. Let's create a folder (or directory) and a file in your container and see how its cnosistency works. Run the following commands:
```
cd /home
mkdir mytestdir
cd mytestdir
touch myfile.txt
ls -l
```

---


