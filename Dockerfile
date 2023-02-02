FROM public.ecr.aws/docker/library/node:16.16-bullseye-slim as base

MAINTAINER MVV

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm pkg delete scripts.prepare

RUN npm ci --omit=dev && npm cache clean --force


FROM base as source

ENV NODE_ENV=development
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm ci

COPY . .


FROM source as dev
ENV NODE_OPTIONS="--max-old-space-size=8192"
CMD ["npm", "run", "start:dev"]


FROM source as build
ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN npm run build


FROM base as prod
ENV NODE_OPTIONS="--max-old-space-size=8192"
COPY --from=build /app/dist /app/dist

CMD ["node", "dist/main"]