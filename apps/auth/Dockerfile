FROM node:alpine as development
WORKDIR /app
COPY package.json /app
RUN pwd
RUN ls -lts ..
RUN ls -lts ../app
RUN npm install
COPY . .
RUN npm run build auth

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package.json ./
RUN npm install --prod
COPY --from=development /app/dist ./dist
CMD [ "node","dist/apps/auth/main" ]