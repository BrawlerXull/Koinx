
# Crypto Trading Microservices Project

## Overview
A microservices-based architecture for a cryptocurrency trading system using Docker and Docker Compose.

### Services Included:
1. **API Server** (`api-server`)
    - Connects to MongoDB (local or Atlas)
    - Publishes events to NATS
    - Handles incoming HTTP requests via NGINX
2. **Worker Server** (`worker-server`)
    - Subscribes to NATS topics
    - Performs background processing
3. **MongoDB** (`mongo`)
    - Used for storing data persistently
4. **NATS** (`nats`)
    - Lightweight publish-subscribe messaging system for internal communication
5. **NGINX** (`nginx`)
    - Acts as a reverse proxy for the API server
6. **Prometheus** (`prometheus`)
    - Collects metrics from API server and other services
7. **Grafana** (`grafana`)
    - Visualizes metrics collected by Prometheus with customizable dashboards

---

## Grafana Dashboard

<img width="1100" alt="Screenshot 2025-06-05 at 11 45 08 PM" src="https://github.com/user-attachments/assets/e2005660-999b-421b-9724-ac48dcfb10c7" />


---

## Architecture

```
                            +-------------------+
                            |                   |
                            |   Client Browser  |
                            |                   |
                            +---------+---------+
                                      |
                                      v
                              +-------+--------+
                              |     NGINX      |
                              | Reverse Proxy  |
                              +-------+--------+
                                      |
                                      v
                             +--------+--------+
                             |     API Server  |
                             | (Express + NATS)|
                             +--------+--------+
                                      |
                   +------------------+------------------+
                   |                                     |
                   v                                     v
           +-------+--------+                   +--------+--------+
           |     MongoDB    |                   |   NATS Server   |
           +----------------+                   +--------+--------+
                                                        |
                                                        v
                                              +---------+---------+
                                              |   Worker Server   |
                                              +-------------------+


             +-------------------+                   +-------------------+
             |    Prometheus     |<------------------|   API Server      |
             |  (Metrics Store)  |                   +-------------------+
             +-------------------+
                       |
                       v
             +-------------------+
             |     Grafana       |
             | (Metrics Visual.) |
             +-------------------+
```

---

## How to Run Locally

### Prerequisites
- Docker & Docker Compose installed
- MongoDB Atlas URI (optional if using remote DB)

### Start the Project

```bash
docker-compose up --build
```

---

## Monitoring Setup

- **Prometheus** scrapes metrics exposed by the API Server and other components on port `9100`.
- **Grafana** connects to Prometheus as a data source and provides dashboards for real-time monitoring.
- You can access:
  - Prometheus UI at: `http://localhost:9090`
  - Grafana UI at: `http://localhost:3001`

---

## Folder Structure

```
.
├── api-server/
│   └── Dockerfile
├── worker-server/
│   └── Dockerfile
├── nginx/
│   └── nginx.conf
├── prometheus/
│   └── prometheus.yml
├── docker-compose.yml
```

---

## Environment Variables

**API Server**
- `NODE_ENV=production`
- `NATS_URL=nats://nats:4222`
- `MONGO_URI=mongodb://mongo:27017/cryptodb` or use Atlas URI
- `METRICS_PORT=9100` (exposes Prometheus metrics)

**Worker Server**
- `NODE_ENV=production`
- `NATS_URL=nats://nats:4222`

---

## Credits
Created by Chinmay Chaudhari 🚀
