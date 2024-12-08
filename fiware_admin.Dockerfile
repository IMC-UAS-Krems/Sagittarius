FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY ./src/fiware_admin/requirements.txt .

RUN pip install --upgrade setuptools && pip install -r requirements.txt && rm -rf /root/.cache


COPY ./src/fiware_admin/*.py .
COPY ./src/fiware_admin/examples/ ./examples

# NOTE: I noticed that air_quality.json contains only one entity. I will create a PR with better data, but for now, we can use this
# Once we have good data in the examples directory, you can remove this block
# This long command fetches the data from the FIWARE Lab and removes the entities with "latest" in their ID
RUN apt-get update && apt-get install curl jq -y --no-install-recommends && \
    curl -G 'https://streams.lab.fiware.org/v2/entities' -H 'fiware-service: environment' --data-urlencode 'limit=1000' | jq 'map(select(.id | contains ("latest") | not))' > examples/air_quality.json

# WARNING: do not paste token in here, use env variable instead
RUN echo '{ \n\
  "platform": "fiware", \n\
  "config": { \n\
    "endpoint": "http://orion:1026/v2", \n\
    "token": "" \n\
  } \n\
}' > config.json

CMD ["python", "fiware_admin.py", "-c", "config.json", "-u", "examples/air_quality.json"]
