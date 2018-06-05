FROM ubuntu

RUN cd /home && mkdir pyuser && cd pyuser

RUN apt-get update && apt-get install -y \
 vim \
 python2.7 \
 python-pip \
 iputils-ping \
 && python -m pip install --upgrade pip \
 && pip install flask \
 && pip install flask-cors \
 && pip install flask-api

COPY app.py /home/pyuser/app.py

RUN chmod 775 /home/pyuser/app.py

EXPOSE 8080

ENTRYPOINT ["python","/home/pyuser/app.py"]
