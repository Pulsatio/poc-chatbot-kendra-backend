
# Prerequisites
1. Install nodejs 18
3. Install docker
4. Install docker-compose


# Step to setup project
1. Clone this repository
2. Install dependencies: `npm install`
3. Generate .env file using .env.example: `cp .env.example .env`
4. Run: `docker-compose up -d`
5. Go to localhost:3000

# Setup database
execute: `docker-compose exec api npx prisma migrate dev --name init`

# Documentation
1. Open openapi documentation at: https://editor.swagger.io/
2. Local url: http://localhost:3000/api-docs
# poc-chatbot-kendra-backend
