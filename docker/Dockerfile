FROM node:15.3.0-stretch
RUN mkdir -p /project/

RUN apt update
RUN apt upgrade -y

WORKDIR /project
RUN git clone https://github.com/SjurWarEagle/MazeLooter .
RUN npm install
RUN pwd
RUN ls -al
RUN npm run build
ENTRYPOINT ["npm", "run", "start"]
