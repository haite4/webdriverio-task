FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@latest && npm install

COPY . .

RUN apt-get update \
    && apt-get install -yq \
        wget \
        libx11-xcb1 \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-archive-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-archive-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

CMD ["npm", "run", "test:firefox:headless"]
