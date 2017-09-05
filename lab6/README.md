# Lab 6 - Running a Cognitive App in Kubernetes on Bluemix

In our last lab we'll setup and run a cognitive app using Kubernetes on Bluemix.

### About our app

This is a simple sample nodeJS app that allows you type a phrase / sentence and Watson will analyze it and return its sentiment along with its score (confidence) and language. The app will also save that into the phrases history.

This app uses the Watson Natural Language Understand (NLU) service to analyze it and a mongodb NoSQL database to store the history.

>We are not going into the code details since this is not our focus here but I extremelly encourage you to read it and try to understand what is going on.

#### Create the NLU 

1. Make sure you followed the steps in the setup guide (bullet 5) to create your Watson NLU service. We are going to use it now.

#### Creating Kubernetes Secret

In order to make a safe application and do not expose our Watson NLU service credentials, Kubernetes comes with a native feature called Secrets that allow you to generate encrypted files to store whatever you want so you don't have to ship them along with your Docker images.

There are several ways to work with secrets in Kubernetes, we are going to use them as volumes since is the way Bluemix allows us to so. Also, Bluemix provide ways, by using its plugins, to bind your service (Watson NLU in our case) to your Kubernetes cluster. For more details about secrets on Kubernetes click [here](https://kubernetes.io/docs/concepts/configuration/secret/) and Kubernetes secrets on Bluemix click [here](https://console.bluemix.net/docs/containers/cs_cluster.html#cs_cluster_service)

2. Let's bind our NLU service to our Kubernetes cluster (the one we have already created).<BR>
Run `bx service list`. You should be able to see the 'nlu' service you created in the setup guide.<BR>
Run the following command to bind the service to your cluster:
```
bx cs cluster-service-bind <your cluster name> default nlu
```
>If you forget your cluster name run `bx cs clusters`.<BR>
This command will actually create a new Kubernetes secret with the NLU credentials in it in the 'default' namespace where we are creating all our objects. We'll not discuss namespaces in this lab.

3. Run `kubectl get secrets --namespace=default` to view all your secrets. You should see a secret called 'binding-nlu' of type 'Opaque'.

#### Create your Mongo DB in Kubernetes

4. Since there's a ready to use mongo docker image, we don't need to worry about creating one but simply tell its name to Kubernetes so it will get it straight from Docker Hub.<BR>
Download all the files from this lab into the same folder (lab6).
>If you want, go to [hub.docker.com](https://hub.docker.com) and look for mongo, you should find the same one we'll be using here.

5. From your lab6 folder in your terminal, let's create our Mongo pod. Run:
```
kubectl create -f pod-mongo.yml
```

6. Run `kubectl get pods` to view all your pods, you should see you 'pod-mongo' is running.

7. In order to make it accessible to other pods and deployments let's create a service to expose this pod internally. Run:
```
kubectl create -f service-mongo.yml
```
>Make sure you take a look into those .yml files so you have a better understanding of what is going. For this service we are using the ClusterIP type since we want to expose it only internally. We define the port we want to (27017 in this case based on the Docker Hub image description.

#### Creating and running the NodeJS app

By this time you already have your secret and database ready. We'll create now a deployment for our nodeJS app so we have more than one replica and higher availability and then expose it externally (to the world).

8. Create the nodeJS app image into Bluemix. Run:
```
bx ic build -t node-alpine .
```

9. Run `bx ic images` to check your image is there.

10. Open the 'dep-node.yml' file with some text editor and change the image registry to reflect yours (look for the <> on line 14).

11. Run the following command to create your Kubernetes deployment:
```
kubectl create -f dep-node.yml
```

12. Run `kubectl get deployments` to view your deployment is running.
>Take a look at the 'dep-node.yml' file you edited. See that we added a volume mount to our container on line 16 and this volume mount is referencing the volume we create right below on line 21 (service-bind-volume). This is how we have a mount point within our image ('/opt/service-bind' in our case) so our code can access all the NLU credentials safely.

13. Our last step is to create the service responsible to expose our node app deployment to the world. Run:
```
kubectl create -f service-nodeapp.yml
```
>Looking into the 'service-nodeapp.yml' file you see that this service is of type 'NodePort' that actually exposes the deployment externally (in our case using port 31002). This service exposes the 'app: nodeapp', 'nodeapp-port', if you go back to the 'dep-node.yml' deployment file, you'll see all those labels and port names created there.<BR><BR>
This is the magic in Kubernetes, you just worry about exposing stuff, it handles all the connections and to which replica to  point to for you!

14. Get your cluster ip running `bx cs workers <your cluster name>` and go to `<your cluster ip>:31002` to play around with your app!
