FROM public.ecr.aws/docker/library/node:16.16-bullseye-slim as base

MAINTAINER MVV

ENV NODE_ENV=production

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm pkg delete scripts.prepare

RUN npm ci --omit=dev && npm cache clean --force


FROM base as source

ENV NODE_ENV=development

RUN npm ci

COPY . .


FROM source as dev

CMD ["npm", "run", "start:dev"]


FROM source as build

RUN npm run build


FROM base as prod

COPY --from=build /app/dist /app/dist

CMD ["node", "dist/main"]