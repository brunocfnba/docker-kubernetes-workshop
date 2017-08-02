FROM alpine:3.6

ENV NODE_HOME /home/node
ENV PORT 8081
ENV PACKAGES=" \
  nodejs \
  nodejs-npm \
"

RUN echo \
  # replacing default repositories with edge ones
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" > /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \

  #updating packages to avoid version issues
  && apk --update upgrade \

  # Add the packages, with a CDN-breakage fallback if needed
  && apk add --no-cache $PACKAGES || \
    (sed -i -e 's/dl-cdn/dl-4/g' /etc/apk/repositories && apk add --no-cache $PACKAGES)

RUN cd /home && mkdir node && cd node

ADD public $NODE_HOME/public
COPY package.json $NODE_HOME
COPY server.js $NODE_HOME

RUN chmod -R 775 $NODE_HOME

RUN cd $NODE_HOME && npm install

EXPOSE 8081

ENTRYPOINT ["node","/home/node/server.js"]
