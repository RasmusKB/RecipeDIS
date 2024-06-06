Things needed to run the project:\
Java 21 (https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) \
Node.js and npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) \
Docker Engine and docker compose\
\
To build the project and run any potential, you navigate to the root folder, and run the command:\
./gradlew build \

To build the project with tests, you can run:\
./gradlew build -x test\
\
To build the project without a cache run:\
./gradlew clean build\
\
Here you can add the '-x test' flag to do a clean build without the tests.\
\
After building, you can run the application by running the command:\
docker compose up --build\
\
Here if you have a docker daemon, you can add the '-d' flag, to run it in the daemon.\
\
To start the frontend, navigate to the 'recipe-app' repository, and run 'npm run start' and you can then find the UI at:\
http://localhost:3000
