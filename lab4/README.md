# Lab 4 - Running Containers on IBM Cloud using Docker and Kubernetes
So far we were able to create containers and run them in our local machine. What about moving them to the cloud and make it available for everyone? This is where we start using IBM Cloud, the IBM cloud platform to run our cool stuff.

In this lab we'll create the same app image we did in Lab 3 but now in IBM Cloud, run it as a simple container and then using Kubernetes to ensure scalability and availability.

1. Make sure you have followed the setup guide so you have all the tools and plugins available for this lab.

2. Download the files from this folder and save them in the same local folder (name it lab4).
>You are downloading a different Dockerfile from Lab 3 since this is using a lighter linux version called [Alpine](https://alpinelinux.org/). The idea is to create the smallest image possible so we have more space to use in the cloud.

3. To run docker commands in IBM Cloud we are going to use `bx` commands. First run `bx login` to connect to your IBM Cloud.
<BR>Provide your e-mail and password. If you have more than one account you have access you might be prompted to select which one you want to log to. Then run `bx target --cf` to select which space in your IBM Cloud org you want to use.

4. Build your dockerfile locally, go to your lab4 folder and run:
```
docker build -t mypyapp .
```
&nbsp;&nbsp;&nbsp;When done run `docker images` to list your images on IBM Cloud and see your new image.

&nbsp;&nbsp;&nbsp;Push your image to the IBM Cloud registry running `docker push registry.ng.bluemix.net/<your namespace>/mypyapp`.

5. Now that you have your image ready for use on IBM Cloud, let's work to run this in Kubernetes.<BR>
Download the dep-pyapp.yml file from this same repo and store in the same folder.

6. Assuming you are already logged in (case not run `bx login`), run `bx cs init --host https://us-south.containers.bluemix.net` to attach to your IBM Cloud Kubernetes environment.<BR>
Then run `bx cs clusters` to get your cluster name.<BR>
Run `bx cs cluster-config <your cluster name>`. This command will return an export command so you can attach your kubectl tool to the IBM Cloud Kubernetes cluster.<BR>
Copy and paste the `export KUBECONFIG=...` command and run it in your terminal.<BR>
To test your setup run `kubectl get deployments`, if everything is ok you should get the 'No resources found' message.

7. Open the 'dep-pyapp.yml' file and replace the <> on line 14 with your container namespace registry (you created in the Lab Setup Guide).

8. To create your new deployment run `kubectl create -f dep-pyapp.yml`. Check it's been successfully created running `kubectl get deployments`.<BR>
You should see the the DESIRED field in the output should be 3 since we want 3 replicas and the CURRENT field should be 3 as well because Kubernetes is working to ensure we have all the replicas working.
>It may take a while to Kubernetes create the pods within the deployment. It will only be ready when the 'AVAILABLE' status (from the 'get deployments' command) shows a number greater than zero.

>Kubernetes deployment are used to create redundancy accross your pods (the docker containers) as well as allow you to update your containers without downtime. Click [here](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) for more details.

9. Now we need to make this deployment available to the world so everyone can access your microservice. For that we are going to create a service.<BR>
Download the 'service-pyapp.yml' file and save it in the same lab4 folder.<BR>
From the same directory you have your file, create the new service running `kubectl create -f service-pyapp.yml`.<BR>
When done run `kubectl get services` and check that you have the service running.
>Go through the service-pyapp.yml file so you have a better understanding of what is going on. This service is of type 'NodePort', reposnsible to expose the internal service to the outside. In our case the service bridges port 8080 (from our app) into port 31001 of the cluster. For more details on services, click [here](https://kubernetes.io/docs/concepts/services-networking/service/).

10. To get our external IP info we have to check what is the Kubernetes cluster worker public IP.<BR>
Run `bx cs clusters` to get your cluster name then run `bx cs workers <your cluster name>`, get the IP listed under 'Public IP'.

11. Open your browser and go to `<your public IP>:31001/myservice/list` and you should see your Python app working. Good job!

**Now that you have your Python web service running, you'll learn how to make changes to your image. Click [here](https://github.com/brunocfnba/docker-kubernetes-workshop/tree/master/lab5) to go straight to lab 5**
