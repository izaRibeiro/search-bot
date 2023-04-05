FROM node

RUN apt-get update

RUN mkdir -p /app

WORKDIR /app

COPY . /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN yarn install

ENV PORT=80

ENV CHROME_PATH=/usr/bin/google-chrome

ENV SITE_URL=https://pratagy.letsbook.com.br/D/Reserva

EXPOSE 80

CMD npm run start:dev