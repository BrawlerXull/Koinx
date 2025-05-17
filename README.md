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

### Folder Structure

```
.
├── api-server/
│   └── Dockerfile
├── worker-server/
│   └── Dockerfile
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
```

---

## Environment Variables

**API Server**
- `NODE_ENV=production`
- `NATS_URL=nats://nats:4222`
- `MONGO_URI=mongodb://mongo:27017/cryptodb` or use Atlas URI

**Worker Server**
- `NODE_ENV=production`
- `NATS_URL=nats://nats:4222`

---

## Credits
Created by Chinmay Chaudhari 🚀
