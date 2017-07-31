# Lab 4 - Running Containers in Bluemix using Docker and Kubernetes
Great, so far we were able to create container and run them in our local machine. What about moving them to the cloud and make it available for everyone? This is where we start using Bluemix, the IBM cloud platform to run our cool stuff.

In this lab we'll create the same app image we did in Lab 3 but now in Bluemix, run it as a simple container and then using Kubernetes to ensure scalability and availability.

1. Make sure you have followed the setup guide so you have all the tools and plugins available for this lab.

2. Download the files from this folder and save them in the same local folder (name it lab4).
>You are downloading a different Dockerfile from Lab 3 since this is using a lighter linux version called [Alpine](https://alpinelinux.org/). The idea is to create the smallest image possible so we have more space to use in the cloud.

3. To run docker commands in Bluemix we are going to use `bx` commands. First run `bx login` to connect to your Bluemix.
<BR>Provide your e-mail and password. If you have more than one account you have access you might be prompted to select which one you want to and then select the space you'll be working.

4. To build your Dockerfile in Bluemix, go to your lab4 fol run:
```
bx ic build -t mypyapp .
```
&nbsp;&nbsp;&nbsp;When done run `bx ic images` to list your images in Bluemix and see your new image.

5. Now that you have your image ready for use in Bluemix, let's work to run this in Kubernetes.<BR>
Download the dep-pyapp.yml file from this same repo and store in the same foled.

6. Assuming you are already logged in (case not run `bx login`), `run bx cs init --host https://us-south.containers.bluemix.net` to attach to your Bluemix Kubernetes environment.<BR>
Then run `bx cs clusters` to get your cluster name.<BR>
Run `bx cs cluster-config <your cluster name>`. This command will return an export command so you can attach your kubectl tool to the Bluemix Kubernetes cluster.<BR>
Copy and paste the `export KUBECONFIG=...` command and run it in your terminal.<BR>
To test your setup run `kubectl get deployments`, if everything is ok you should get the 'No resources found' message.

7. To create your new deployment run `kubectl create -f dep-pyapp.yml`. Check it's been successfully created running `kubectl get deployments`.<BR>
You should see the the DESIRED should be 3 since we want 3 replicas and current 3 as well because Kubernetes is working to ensure we have all the replicas working.
>Kubernetes deployment are used to create redundancy accross your pods (the docker containers) as well as allow you to update your containers withou downtime. Click [here](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) for more details.

8. Now we need to make this deployment available to the world so everyone can access your microservice. For that we are going to create a service.<BR>
Download the 'service-pyapp.yml' file and save it in the same lab4 folder.<BR>
From the same directory you have your file create the new service running `kubectl create -f service-pyapp.yml`.<BR>
When done run `kubectl get services` and check that you have the service running.
>Go through the service-pyapp.yml file so you have a better understanding of what is going on. This service is of type 'NodePort', reposnsible to expose the internal service to the outside. In our case the service bridges port 8080 (from our app) into port 31001. For more details on services click [here](https://kubernetes.io/docs/concepts/services-networking/service/).

9. To get our external IP info we have to check what is the Kubernetes cluster worker public IP.<BR>
Run `bx cs cluster` to get your cluster name then run `bx cs workers <your cluster name>`, get the IP listed under 'Public IP'.

10. Open your browser and go to `<your public IP>:31001/myservice/list` and you should see your Python app working. Good job!
