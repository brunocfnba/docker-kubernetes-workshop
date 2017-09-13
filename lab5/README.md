# Lab 5 - Updating your application with 0 downtime in Kubernetes
In this lab we are going to perform some updates to our Python application and since we already have our Kubernetes deployment running with 3 replicas, we want our new changes to be applied without any downtime to our end users.
>In order to go through Lab 5 you must have gone through Lab 4 and completed all its tasks successfully.
1. Let's build a new image with our changes into Bluemix. Create a 'lab5' directory and download the 'Dockerfile' and 'app2.py' from this lab.

2. Build the new Dockerfile into your Bluemix registry. From your lab5 folder run:
```
bx ic build -t mypyapp2 .
```
&nbsp;&nbsp;&nbsp;Run `bx ic images` and check your new image is there.

3. Let's see our three pods that Kubernetes created when we created our deployment with three replicas. Run `kubectl get pods`, you should see three pods with their names starting with the deployment name (in our case dep-pyapp...).

4. So now we have a new image with our updated app (it could be anything, from your code to any OS library you changed) and we want to update our application to reflect those changes with 0 downtime to our users.<BR>
Doing that in Kubernetes is really a piece of cake, all you have to do is set your deployment container image to your new image running the following:
```
kubectl set image deployment/dep-pyapp pyapp-container=registry.ng.bluemix.net/<your registry namespace>/mypyapp2
```
>The set image command requires the 'kind' of Kubernetes, 'deployment' in our case, then the object name, 'dep-pyapp', container name , pyapp-container and then the new image. Take a look at the dep-pyapp.yml file so you can understand where those definitions come from.
5. Run `kubectl get pods` right after the previous command so you can see the upgrade happening.
>while running the above command you might be able to see the old pods being terminated and the new ones being created until they reach the 'running'status.

6. To check the rollout status and ensure it's finished run `kubectl rollout status deployment/dep-pyapp`.

7. Run `bx cs workers <your cluster name>` to get your public IP and then go to you browser and open `<your public IP>:31001/myservice/list` and check that the content from the new image is already there.
>For this lab we did just a minor change in the code, version one simply shows a json array with the product names, version two shows a more complete json with the product's prices as well.

8. Great, you should have your new app deployed with 0 downtime! What if you found some issue or you simply want to get back to the previous version? In Kubernetes that's quite simple. Just run:
```
kubectl rollout undo deployment/dep-pyapp
``` 
&nbsp;&nbsp;&nbsp;Repeat steps 5 and 6 from this lab to view Kubernetes creating the old pods back and then go to the same URL to check the old version has been deployed.

**Good job so far! Now let's create our cognitive app using Kubernetes and Docker, click [here](https://github.com/brunocfnba/docker-kubernetes-workshop/tree/master/lab6) to go to lab 6**
