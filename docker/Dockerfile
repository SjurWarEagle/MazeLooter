FROM node:15.3.0-stretch
RUN mkdir -p /project/

RUN apt update
RUN apt upgrade -y

RUN git clone https://github.com/SjurWarEagle/MazeLooter
WORKDIR /project
RUN npm install
RUN npm run build
ENTRYPOINT ["npm", "run", "start"]
