FROM node:20-alpine AS build
RUN apk update && apk upgrade
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm cache clean --force && npm install

COPY . .

RUN ls -al /app && npm ls

RUN npm run api:generate
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache shadow

RUN useradd -u 1001 -M -s /bin/false nonrootuser

COPY --from=build /app/dist /usr/share/nginx/html

RUN chown -R nonrootuser:nonrootuser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

RUN chown -R nonrootuser:nonrootuser /etc/nginx/conf.d /var/cache/nginx /var/run

USER nonrootuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
