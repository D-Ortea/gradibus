FROM python:3.8-rc-alpine
RUN apk update && \
    apk add git && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add postgresql-dev
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN git clone https://github.com/D-Ortea/gradibus.git . && \
    pip install -r requirements.txt
COPY . /code/
EXPOSE 80
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
