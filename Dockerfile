FROM gramener/gramex:latest
WORKDIR /ipl-dashboard
COPY . /ipl-dashboard
EXPOSE 9988
RUN npm install
CMD ["gramex"]